from datetime import datetime
from bson import ObjectId


class Company:

    @staticmethod
    def create_payload(domain, company_name, company_type, trust_score, checks, created_by):

        # Determine status from trust score
        status = "verified" if trust_score >= 70 else "pending"

        return {
            "domain": domain.lower().strip(),
            "company_name": company_name.strip(),
            "companyType": company_type,
            "trust_score": trust_score,

            "checks": {
                "email_verified": checks.get("email_verified", False),
                "dns_exists": checks.get("dns_exists", False),
                "mx_exists": checks.get("mx_exists", False),
                "whois_match": checks.get("whois_match", False),
                "domain_old": checks.get("domain_old", False),
                "website_valid": checks.get("website_valid", False),
                "linkedin_match": checks.get("linkedin_match", False),
                "recruiter_match": checks.get("recruiter_match", False),
                "dns_txt_verified": checks.get("dns_txt_verified", False),
                "cin_id_verified": checks.get("cin_id_verified", False),
                "pan_id_verified": checks.get("pan_id_verified", False)
            },

            "status": status,

            # 📊 Employer behavior analytics
            "behavior": {
                "jobsPostedCount": 0,
                "activeJobsCount": 0,
                "offerAcceptanceRate": 0.0,
                "paymentDefaultCount": 0,
                "reportsAgainstEmployer": 0
            },

            "performance": {
                "internsHired": 0,
                "avgStudentRating": 0.0,
                "completionRate": 0.0,
                "repeatHireRate": 0.0
            },

            # Employer linkage
            "created_by": ObjectId(created_by),

            "created_at": datetime.utcnow(),
            "last_verified_at": datetime.utcnow()
        }