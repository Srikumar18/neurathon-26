from flask import request, jsonify
from datetime import datetime
from bson import ObjectId
import re
from loader.dbconnect import get_db
from models.student import Student


# Validation weights for student credibility scoring
VALIDATION_WEIGHTS = {
    "email_verified": 15,
    "phone_verified": 10,
    "institution_verified": 20,
    "linkedin_valid": 10,
    "profile_complete": 15,
    "cgpa_valid": 5,
    "graduation_year_valid": 5
}


def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_phone(phone):
    """Validate phone number format (Indian format)"""
    pattern = r'^[6-9]\d{9}$'
    return re.match(pattern, phone.replace("+91", "").replace(" ", "")) is not None


def validate_cgpa(cgpa):
    """Validate CGPA is within reasonable range"""
    try:
        cgpa_float = float(cgpa)
        return 0.0 <= cgpa_float <= 10.0
    except (ValueError, TypeError):
        return False


def validate_graduation_year(year):
    """Validate graduation year is reasonable"""
    try:
        year_int = int(year)
        current_year = datetime.utcnow().year
        return current_year <= year_int <= current_year + 6
    except (ValueError, TypeError):
        return False


def calculate_profile_completeness(data):
    """Calculate profile completeness score based on filled fields"""
    score = 0
    max_score = 100
    
    # Basic fields (40 points)
    if data.get("full_name"):
        score += 10
    if data.get("email"):
        score += 10
    if data.get("phone"):
        score += 10
    if data.get("location"):
        score += 10
    
    # Education fields (30 points)
    if data.get("institution_name"):
        score += 10
    if data.get("degree"):
        score += 10
    if data.get("graduation_year"):
        score += 10
    
    # Skills (20 points)
    if data.get("primary_skills") and len(data.get("primary_skills", [])) > 0:
        score += 15
    if data.get("languages") and len(data.get("languages", [])) > 0:
        score += 5
    
    # Additional fields (10 points)
    if data.get("linkedin"):
        score += 5
    if data.get("looking_for") and len(data.get("looking_for", [])) > 0:
        score += 5
    
    return min(score, max_score)


def register_candidate():
    """
    Register a new student/candidate in the system with validation and credibility scoring.
    
    Expected JSON payload:
    {
        "full_name": str,
        "email": str,
        "phone": str,
        "linkedin": str (optional),
        "location": str,
        "institution_name": str,
        "degree": str,
        "graduation_year": int,
        "cgpa": float,
        "primary_skills": list,
        "secondary_skills": list (optional),
        "languages": list,
        "looking_for": list (optional),
        "preferred_locations": list (optional),
        "expected_stipend_range": dict (optional)
    }
    """
    
    data = request.json
    db = get_db()
    # Extract required fields
    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip()
    
    # Validation results
    validation_results = {
        "email_verified": False,
        "phone_verified": False,
        "institution_verified": False,
        "linkedin_valid": False,
        "profile_complete": False,
        "cgpa_valid": False,
        "graduation_year_valid": False
    }
    
    credibility_score = 100
    
    # ---------- HARD BLOCKS (Required validations) ----------
    
    # Validate email format
    if not email or not validate_email(email):
        return jsonify({
            "status": "rejected",
            "reason": "invalid_email_format"
        }), 400
    
    # Check if email already exists
    existing_student = db["students"].find_one({"basic.email": email})
    if existing_student:
        return jsonify({
            "status": "rejected",
            "reason": "email_already_registered"
        }), 400
    
    validation_results["email_verified"] = True
    
    # Validate full name
    if not full_name or len(full_name) < 3:
        return jsonify({
            "status": "rejected",
            "reason": "invalid_name"
        }), 400
    
    # Validate phone format
    if not phone or not validate_phone(phone):
        return jsonify({
            "status": "rejected",
            "reason": "invalid_phone_format"
        }), 400
    
    validation_results["phone_verified"] = True
    
    # ---------- SOFT VALIDATIONS (Affect credibility score) ----------
    
    # Validate institution
    institution_name = data.get("institution_name", "").strip()
    if institution_name and len(institution_name) > 3:
        validation_results["institution_verified"] = True
    else:
        credibility_score -= VALIDATION_WEIGHTS["institution_verified"]
    
    # Validate LinkedIn
    linkedin = data.get("linkedin", "").strip()
    if linkedin and "linkedin.com/in/" in linkedin.lower():
        validation_results["linkedin_valid"] = True
    else:
        credibility_score -= VALIDATION_WEIGHTS["linkedin_valid"]
    
    # Validate CGPA
    cgpa = data.get("cgpa", 0.0)
    if validate_cgpa(cgpa):
        validation_results["cgpa_valid"] = True
    else:
        credibility_score -= VALIDATION_WEIGHTS["cgpa_valid"]
    
    # Validate graduation year
    graduation_year = data.get("graduation_year")
    if graduation_year and validate_graduation_year(graduation_year):
        validation_results["graduation_year_valid"] = True
    else:
        credibility_score -= VALIDATION_WEIGHTS["graduation_year_valid"]
    
    # Calculate profile completeness
    profile_completeness_score = calculate_profile_completeness(data)
    if profile_completeness_score >= 70:
        validation_results["profile_complete"] = True
    else:
        credibility_score -= VALIDATION_WEIGHTS["profile_complete"]
    
    # Ensure credibility score doesn't go below minimum
    credibility_score = max(credibility_score, 30)
    
    # Determine risk level based on credibility score
    if credibility_score >= 80:
        behavior_risk_level = "low"
    elif credibility_score >= 60:
        behavior_risk_level = "medium"
    else:
        behavior_risk_level = "high"
    
    # ---------- CREATE STUDENT PROFILE ----------
    
    student_payload = Student.create_payload(
        # Basic information
        full_name=full_name,
        email=email,
        phone=phone,
        linkedin=linkedin,
        location=data.get("location"),
        
        # Verification data
        email_verified=validation_results["email_verified"],
        phone_verified=validation_results["phone_verified"],
        identity_verified=False,  # Requires manual verification
        student_status_verified=validation_results["institution_verified"],
        profile_completeness_score=profile_completeness_score,
        
        # Education data
        institution_name=institution_name,
        degree=data.get("degree"),
        graduation_year=graduation_year,
        cgpa=cgpa,
        
        # Skills data
        primary_skills=data.get("primary_skills", []),
        secondary_skills=data.get("secondary_skills", []),
        languages=data.get("languages", []),
        
        # Behavior data (defaults for new user)
        applications_submitted=0,
        interview_show_rate=0.0,
        response_rate=0.0,
        active_streak_days=0,
        
        # Trust data
        fraud_probability_score=0.0,
        behavior_risk_level=behavior_risk_level,
        credibility_score=credibility_score,
        fake_experience_detected=False,
        
        # Preferences data
        looking_for=data.get("looking_for", []),
        preferred_locations=data.get("preferred_locations", []),
        expected_stipend_range=data.get("expected_stipend_range", {
            "min": 0,
            "max": 0,
            "currency": "INR"
        })
    )
    
    # Insert into database
    result = db["students"].insert_one(student_payload)
    student_id = result.inserted_id
    
    # Determine status
    status = "verified" if credibility_score >= 70 else "pending_review"
    
    # Return response
    return jsonify({
        "status": status,
        "student_id": str(student_id),
        "credibility_score": credibility_score,
        "behavior_risk_level": behavior_risk_level,
        "profile_completeness_score": profile_completeness_score,
        "validation_results": validation_results,
        "message": "Student registered successfully"
    }), 201