import random
import time
from datetime import datetime, timedelta

class OTPService:
    def __init__(self):
        # In-memory storage: {email: {'otp': '123456', 'expires_at': timestamp, 'used': False}}
        self.otp_store = {}
        self.otp_expiry_minutes = 10  # OTP valid for 10 minutes
    
    def generate_otp(self):
        """Generate a random 6-digit OTP"""
        return str(random.randint(100000, 999999))
    
    def create_and_store_otp(self, email):
        """
        Create a new OTP for the email and store it.
        If an OTP already exists, generate a new one (for resend functionality).
        """
        otp = self.generate_otp()
        expires_at = datetime.now() + timedelta(minutes=self.otp_expiry_minutes)
        
        self.otp_store[email] = {
            'otp': otp,
            'expires_at': expires_at,
            'used': False
        }
        
        return otp
    
    def verify_otp(self, email, otp):
        """
        Verify if the OTP is valid for the given email.
        Returns (success: bool, message: str)
        """
        if email not in self.otp_store:
            return False, "No OTP found for this email"
        
        stored_data = self.otp_store[email]
        
        # Check if OTP has been used
        if stored_data['used']:
            return False, "OTP has already been used"
        
        # Check if OTP has expired
        if datetime.now() > stored_data['expires_at']:
            return False, "OTP has expired"
        
        # Check if OTP matches
        if stored_data['otp'] != otp:
            return False, "Invalid OTP"
        
        # Mark OTP as used
        self.otp_store[email]['used'] = True
        
        return True, "OTP verified successfully"
    
    def cleanup_expired_otps(self):
        """Remove expired OTPs from storage"""
        current_time = datetime.now()
        expired_emails = [
            email for email, data in self.otp_store.items()
            if current_time > data['expires_at']
        ]
        for email in expired_emails:
            del self.otp_store[email]

# Singleton instance
otp_service = OTPService()





