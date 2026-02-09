from flask import Flask, jsonify, request
import jwt
from flask_cors import CORS
from auth import auth_bp
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

CORS(app)

# Register authentication blueprint
app.register_blueprint(auth_bp, url_prefix='/api/auth')

def token_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Token missing"}), 401
        try:
            jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except Exception:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

@app.route('/')
def home():
    return jsonify({
        'message': 'Flask OTP API is running',
        'status': 'healthy',
        'endpoints': {
            'send_otp': '/api/auth/candidate-send-otp',
            'verify_otp': '/api/auth/candidate-verify-otp'
        }
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'otp-service'
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'message': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5000, debug=True)

