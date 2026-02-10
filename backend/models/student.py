from datetime import datetime, timezone
from bson import ObjectId


class Student:

    @staticmethod
    def clamp(value, min_v, max_v):
        """Utility method to clamp a value between min and max"""
        return max(min_v, min(max_v, value))

    @staticmethod
    def get_current_utc_time():
        """Get current UTC time in ISO format"""
        return datetime.now(timezone.utc).isoformat()

    @staticmethod
    def create_payload(
        # Basic information
        full_name=None,
        email=None,
        phone=None,
        linkedin=None,
        location=None,
        
        # Verification data
        email_verified=False,
        phone_verified=False,
        identity_verified=False,
        student_status_verified=False,
        profile_completeness_score=0,
        
        # Education data
        institution_name=None,
        degree=None,
        graduation_year=None,
        cgpa=0.0,
        
        # Skills data
        primary_skills=None,
        secondary_skills=None,
        languages=None,
        
        # Behavior data
        applications_submitted=0,
        interview_show_rate=0.0,
        response_rate=0.0,
        active_streak_days=0,
        
        # Trust data
        fraud_probability_score=0.0,
        behavior_risk_level="low",
        credibility_score=50,
        fake_experience_detected=False,
        
        # Preferences data
        looking_for=None,
        preferred_locations=None,
        expected_stipend_range=None,
        
        # System fields
        student_id=None,
        created_at=None
    ):
        """
        Create a student payload with all required fields.
        
        Args:
            All student-related fields with sensible defaults
            
        Returns:
            dict: Complete student document ready for MongoDB insertion
        """
        
        # Set default mutable objects
        if primary_skills is None:
            primary_skills = []
        if secondary_skills is None:
            secondary_skills = []
        if languages is None:
            languages = []
        if looking_for is None:
            looking_for = []
        if preferred_locations is None:
            preferred_locations = []
        if expected_stipend_range is None:
            expected_stipend_range = {"min": 0, "max": 0, "currency": "INR"}
        
        current_time = Student.get_current_utc_time()
        
        # ---------- Basic ----------
        basic_info = {
            "fullName": full_name,
            "email": email,
            "phone": phone,
            "linkedin": linkedin,
            "location": location,
            "accountCreatedAt": created_at or current_time,
            "lastActiveAt": current_time
        }

        # ---------- Verification ----------
        verification = {
            "emailVerified": bool(email_verified),
            "phoneVerified": bool(phone_verified),
            "identityVerified": bool(identity_verified),
            "studentStatusVerified": bool(student_status_verified),
            "profileCompletenessScore": Student.clamp(profile_completeness_score, 0, 100)
        }

        # ---------- Education ----------
        education = {
            "institutionName": institution_name,
            "degree": degree,
            "graduationYear": graduation_year,
            "cgpa": float(cgpa),
        }

        # ---------- Skills ----------
        skills = {
            "primarySkills": primary_skills,
            "secondarySkills": secondary_skills,
            "languages": languages,
        }

        # ---------- Behavior ----------
        behavior = {
            "applicationsSubmitted": int(applications_submitted),
            "interviewShowRate": float(interview_show_rate),
            "responseRate": float(response_rate),
            "activeStreakDays": int(active_streak_days)
        }

        # ---------- Trust ----------
        trust = {
            "fraudProbabilityScore": Student.clamp(float(fraud_probability_score), 0, 1),
            "behaviorRiskLevel": behavior_risk_level,
            "credibilityScore": Student.clamp(int(credibility_score), 0, 100),
            "fakeExperienceDetected": bool(fake_experience_detected)
        }

        # ---------- Preferences ----------
        preferences = {
            "lookingFor": looking_for,
            "preferredLocations": preferred_locations,
            "expectedStipendRange": expected_stipend_range
        }

        return {
            "_id": student_id or ObjectId(),
            "basic": basic_info,
            "verification": verification,
            "education": education,
            "skills": skills,
            "behavior": behavior,
            "trust": trust,
            "preferences": preferences,
            "createdAt": created_at or current_time,
            "updatedAt": current_time
        }
