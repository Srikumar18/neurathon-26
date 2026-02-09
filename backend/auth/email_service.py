import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

class EmailService:
    def __init__(self):
        # SMTP Configuration from environment variables
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.smtp_user = os.getenv('SMTP_USER')
        self.smtp_password = os.getenv('SMTP_PASSWORD')
        self.from_email = os.getenv('FROM_EMAIL', self.smtp_user)
        self.from_name = os.getenv('FROM_NAME', 'Your App')
    
    def send_otp_email(self, to_email, otp):
        """
        Send OTP via email using SMTP
        Returns (success: bool, message: str)
        """
        try:
            # Create message
            message = MIMEMultipart('alternative')
            message['Subject'] = 'Your OTP for Verification'
            message['From'] = f"{self.from_name} <{self.from_email}>"
            message['To'] = to_email
            
            # Plain text version
            text = f"""
Hi,

Your OTP for verification is: {otp}

This OTP is valid for 10 minutes.

If you didn't request this, please ignore this email.

Best regards,
{self.from_name}
            """
            
            # HTML version (more beautiful)
            html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                                Email Verification
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hi there,
                            </p>
                            
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                Your One-Time Password (OTP) for verification is:
                            </p>
                            
                            <!-- OTP Box -->
                            <div style="background-color: #f8f9fa; border: 2px dashed #667eea; border-radius: 8px; padding: 30px; text-align: center; margin: 0 0 30px 0;">
                                <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #667eea; font-family: 'Courier New', monospace;">
                                    {otp}
                                </div>
                            </div>
                            
                            <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                                ⏱️ This OTP is valid for <strong>10 minutes</strong>.
                            </p>
                            
                            <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0;">
                                🔒 For security reasons, please do not share this OTP with anyone.
                            </p>
                            
                            <div style="border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 20px;">
                                <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 0;">
                                    If you didn't request this verification code, please ignore this email or contact support if you have concerns.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="color: #999999; font-size: 12px; margin: 0; line-height: 1.6;">
                                Best regards,<br>
                                <strong>{self.from_name}</strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            """
            
            # Attach both plain text and HTML versions
            part1 = MIMEText(text, 'plain')
            part2 = MIMEText(html, 'html')
            message.attach(part1)
            message.attach(part2)
            
            # Connect to SMTP server and send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()  # Secure the connection
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(message)
            
            print(f"✅ OTP sent successfully to {to_email}")
            return True, "OTP sent successfully"
        
        except smtplib.SMTPAuthenticationError:
            print("❌ SMTP Authentication failed - check username/password")
            return False, "Email authentication failed"
        
        except smtplib.SMTPException as e:
            print(f"❌ SMTP error: {str(e)}")
            return False, f"Failed to send email: {str(e)}"
        
        except Exception as e:
            print(f"❌ Error sending email: {str(e)}")
            return False, f"Failed to send OTP: {str(e)}"

# Singleton instance
email_service = EmailService()





