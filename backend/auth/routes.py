from flask import Blueprint, request, jsonify
from .otp_service import otp_service
from .email_service import email_service
from .employer_signup import register_employer
from .candidate_signup import register_candidate
import re

auth_bp = Blueprint('auth', __name__)

def is_valid_email(email):
    """Basic email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@auth_bp.route('/candidate-send-otp', methods=['POST'])
def send_otp():
    """
    Send OTP to candidate's email
    Request body: { "email": "user@example.com" }
    """
    try:
        # Get email from request body
        data = request.get_json()
        
        if not data or 'email' not in data:
            return jsonify({
                'success': False,
                'message': 'Email is required'
            }), 400
        
        email = data['email'].strip().lower()
        
        # Validate email format
        if not is_valid_email(email):
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400
        
        # Generate new OTP (even if resending, generate a fresh one)
        otp = otp_service.create_and_store_otp(email)
        
        # Send OTP via email
        success, message = email_service.send_otp_email(email, otp)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'OTP sent successfully to your email',
                'email': email
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': message
            }), 500
    
    except Exception as e:
        print(f"Error in send_otp: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while sending OTP'
        }), 500

@auth_bp.route('/candidate-verify-otp', methods=['POST'])
def verify_otp():
    """
    Verify OTP for candidate
    Request body: { "email": "user@example.com", "otp": "123456" }
    """
    try:
        # Get email and OTP from request body
        data = request.get_json()
        
        if not data or 'email' not in data or 'otp' not in data:
            return jsonify({
                'success': False,
                'message': 'Email and OTP are required'
            }), 400
        
        email = data['email'].strip().lower()
        otp = data['otp'].strip()
        
        # Validate email format
        if not is_valid_email(email):
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400
        
        # Validate OTP format (6 digits)
        if not otp.isdigit() or len(otp) != 6:
            return jsonify({
                'success': False,
                'message': 'OTP must be 6 digits'
            }), 400
        
        # Verify OTP
        success, message = otp_service.verify_otp(email, otp)
        
        if success:
            return jsonify({
                'success': True,
                'message': message,
                'email': email,
                'verified': True
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': message,
                'verified': False
            }), 400
    
    except Exception as e:
        print(f"Error in verify_otp: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while verifying OTP'
        }), 500


@auth_bp.route('/register-employer', methods=['POST'])
def employer_signup():
    return register_employer()

@auth_bp.route('/register-candidate', methods=['POST'])
def candidate_signup():
    return register_candidate()
