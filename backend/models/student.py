from datetime import datetime, timezone
from bson import ObjectId


def get_current_utc_time():
    return datetime.now(timezone.utc).isoformat()


def clamp(value, min_v, max_v):
    return max(min_v, min(max_v, value))


def generate_student_cluster(student_data=None):

    if student_data is None:
        student_data = {}

    # ---------- Basic ----------
    basic_info = {
        "fullName": student_data.get("fullName"),
        "email": student_data.get("email"),
        "phone": student_data.get("phone"),
        "linkedin": student_data.get("linkedin"),
        "location": student_data.get("location"),
        "accountCreatedAt": student_data.get("accountCreatedAt", get_current_utc_time()),
        "lastActiveAt": student_data.get("lastActiveAt", get_current_utc_time())
    }

    # ---------- Verification ----------
    verification = {
        "emailVerified": bool(student_data.get("emailVerified", False)),
        "phoneVerified": bool(student_data.get("phoneVerified", False)),
        "identityVerified": bool(student_data.get("identityVerified", False)),
        "studentStatusVerified": bool(student_data.get("studentStatusVerified", False)),
        "profileCompletenessScore": clamp(student_data.get("profileCompletenessScore", 0), 0, 100)
    }

    # ---------- Education ----------
    education = {
        "institutionName": student_data.get("institutionName"),
        "degree": student_data.get("degree"),
        "graduationYear": student_data.get("graduationYear"),
        "cgpa": float(student_data.get("cgpa", 0.0)),
    }

    # ---------- Skills ----------
    skills = {
        "primarySkills": student_data.get("primarySkills", []),
        "secondarySkills": student_data.get("secondarySkills", []),
        "languages": student_data.get("languages", []),
    }

    # ---------- Behavior ----------
    behavior = {
        "applicationsSubmitted": int(student_data.get("applicationsSubmitted", 0)),
        "interviewShowRate": float(student_data.get("interviewShowRate", 0.0)),
        "responseRate": float(student_data.get("responseRate", 0.0)),
        "activeStreakDays": int(student_data.get("activeStreakDays", 0))
    }

    # ---------- Trust ----------
    trust = {
        "fraudProbabilityScore": clamp(float(student_data.get("fraudProbabilityScore", 0.0)), 0, 1),
        "behaviorRiskLevel": student_data.get("behaviorRiskLevel", "low"),
        "credibilityScore": clamp(int(student_data.get("credibilityScore", 50)), 0, 100),
        "fakeExperienceDetected": bool(student_data.get("fakeExperienceDetected", False))
    }

    # ---------- Preferences ----------
    preferences = {
        "lookingFor": student_data.get("lookingFor", []),
        "preferredLocations": student_data.get("preferredLocations", []),
        "expectedStipendRange": student_data.get(
            "expectedStipendRange",
            {"min": 0, "max": 0, "currency": "INR"}
        )
    }

    return {
        "_id": student_data.get("_id", ObjectId()),
        "basic": basic_info,
        "verification": verification,
        "education": education,
        "skills": skills,
        "behavior": behavior,
        "trust": trust,
        "preferences": preferences,
        "createdAt": student_data.get("createdAt", get_current_utc_time()),
        "updatedAt": get_current_utc_time()
    }