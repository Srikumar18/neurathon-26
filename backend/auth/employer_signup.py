from flask import request, jsonify
from datetime import datetime
from bson import ObjectId
import dns.resolver
import whois
import requests
from rapidfuzz import fuzz
from loader.dbconnect import get_db
from models.company import Company
from models.employer import Employer

WEIGHTS = {
    "mx_exists": 5,
    "whois_match": 15,
    "domain_old": 10,
    "linkedin_match": 10,
    "recruiter_match": 10,
    "dns_txt_verified": 10
}

def register_employer():

    data = request.json
    db = get_db()

    if not data:
        return jsonify({"status": "rejected", "reason": "Request body must be JSON"}), 400

    required_fields = ["domain", "company_name", "company_type", "employer_email"]
    for field in required_fields:
        if field not in data:
            return jsonify({"status": "rejected", "reason": f"Missing required field: {field}"}), 400

    domain = data["domain"]
    company_name = data["company_name"]
    company_type = data["company_type"]
    employer_email = data["employer_email"]

    # ---------- CREATE EMPLOYER FIRST ----------

    employer = db["employers"].insert_one({
        "email": employer_email,
    })

    employer_id = employer.inserted_id

    results = {
        "email_verified": True,
        "dns_exists": False,
        "mx_exists": False,
        "whois_match": False,
        "domain_old": False,
        "website_valid": False,
        "linkedin_match": data.get("linkedin_match", False),
        "recruiter_match": data.get("recruiter_match", False),
        "dns_txt_verified": data.get("dns_txt_verified", False),
        "cin_id_verified": False,
        "pan_id_verified": False
    }

    trust_score = 100

    # ---------- DNS HARD BLOCK ----------

    try:
        dns.resolver.resolve(domain, "A")
        results["dns_exists"] = True
    except:
        return jsonify({"status": "rejected", "reason": "domain_not_resolvable"}), 400

    # ---------- MX ----------

    try:
        dns.resolver.resolve(domain, "MX")
        results["mx_exists"] = True
    except:
        trust_score -= WEIGHTS["mx_exists"]

    # ---------- WHOIS ----------

    try:
        w = whois.whois(domain)
        org = str(w.get("org", "")).lower()

        if fuzz.partial_ratio(org, company_name.lower()) > 70:
            results["whois_match"] = True
        else:
            trust_score -= WEIGHTS["whois_match"]

        creation = w.creation_date
        if isinstance(creation, list):
            creation = creation[0]

        if creation and (datetime.utcnow() - creation).days > 180:
            results["domain_old"] = True
        else:
            trust_score -= WEIGHTS["domain_old"]

    except:
        trust_score -= WEIGHTS["whois_match"]
        trust_score -= WEIGHTS["domain_old"]

    # ---------- WEBSITE HARD BLOCK ----------

    try:
        r = requests.get(f"https://{domain}", timeout=6)

        if r.status_code == 200 and len(r.text) > 500:
            results["website_valid"] = True
        else:
            return jsonify({"status": "rejected", "reason": "website_invalid"}), 400

    except:
        return jsonify({"status": "rejected", "reason": "website_unreachable"}), 400

    # ---------- SOFT SIGNALS ----------

    if not results["linkedin_match"]:
        trust_score -= WEIGHTS["linkedin_match"]

    if not results["recruiter_match"]:
        trust_score -= WEIGHTS["recruiter_match"]

    if not results["dns_txt_verified"]:
        trust_score -= WEIGHTS["dns_txt_verified"]

    trust_score = max(trust_score, 30)

    # ---------- CREATE COMPANY ----------

    company_payload = Company.create_payload(
        domain,
        company_name,
        company_type,
        trust_score,
        results,
        employer_id
    )

    db["companies"].insert_one(company_payload)

    company = db["companies"].find_one({"domain": domain})

    # ---------- LINK EMPLOYER → COMPANY ----------

    db["employers"].update_one(
        {"_id": employer_id},
        {"$set": {"company_id": company["_id"]}}
    )

    return jsonify({
        "status": company_payload["status"],
        "company_id": str(company["_id"]),
        "employer_id": str(employer_id),
        "trust_score": trust_score,
        "checks": results
    })
