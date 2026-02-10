import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Badge';
import { ShieldCheck, User, Briefcase, Upload, CheckCircle, Building2, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';
import axiosInstance from '../../lib/axios';

export function Signup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('student'); // 'student' or 'employer'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpSent, setOtpSent] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        file: null,
        // Employer specific fields
        companyName: '',
        companyType: 'mnc',
        cin: '',
        pan: '',
        domain: ''
    });

    // Extract domain from email for employers
    useEffect(() => {
        if (role === 'employer' && formData.email.includes('@')) {
            const domain = formData.email.split('@')[1];
            setFormData(prev => ({ ...prev, domain }));
        }
    }, [formData.email, role]);

    const totalSteps = 4; // Increased to 4 to include OTP
    const progress = (step / totalSteps) * 100;

    // Send OTP function
    const sendOtp = async () => {
        setError('');
        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/auth/candidate-send-otp', {
                email: formData.email
            });

            console.log('OTP sent successfully:', response.data);
            setOtpSent(true);
            setStep(3); // Move to OTP verification step
        } catch (err) {
            console.error('Error sending OTP:', err);
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Verify OTP function
    const verifyOtp = async () => {
        setError('');
        setIsLoading(true);

        const otpString = otp.join('');

        if (otpString.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/candidate-verify-otp', {
                email: formData.email,
                otp: otpString
            });

            console.log('OTP verified successfully:', response.data);
            setStep(4); // Move to next step after successful verification
        } catch (err) {
            console.error('Error verifying OTP:', err);
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
            setOtp(['', '', '', '', '', '']); // Clear OTP inputs
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP function
    const resendOtp = async () => {
        setOtp(['', '', '', '', '', '']); // Clear existing OTP
        await sendOtp();
    };

    const handleNext = async () => {
        setError('');

        // Validation for step 2
        if (step === 2) {
            if (!formData.email) {
                setError('Please enter your email');
                return;
            }
            if (!formData.password) {
                setError('Please enter a password');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // Send OTP when moving from step 2 to step 3
            await sendOtp();
            return;
        }

        if (step < totalSteps) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple chars
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleSubmit = async () => {
        setError('');
        setIsLoading(true);

        try {
            if (role === 'employer') {
                const payload = {
                    company_name: formData.companyName,
                    company_type: formData.companyType,
                    employer_email: formData.email,
                    employer_password: formData.password,
                    domain: formData.domain,
                    cin: formData.companyType === 'startup' ? formData.cin : undefined,
                    pan: formData.companyType === 'individual' ? formData.pan : undefined,
                };


                // Debug Payload
                console.log("--------------------------------------------------");
                console.log("🚀 SENDING PAYLOAD TO SERVER:", BACKEND_URL);
                console.log(JSON.stringify(payload, null, 2));
                console.log("--------------------------------------------------");

                const response = await axiosInstance.post('/auth/register-user', payload);

                if (!response.ok) {
                    throw new Error(data.reason || data.error || "Registration failed");
                }

                alert("Backend Registration Successful! (Check Console)");
                navigate('/employer/dashboard');
            } else {
                navigate('/student/dashboard');
            }
        } catch (err) {
            console.error("Signup Error:", err);
            setError(err.message);
            // navigate to dashboard anyway for demo purposes
            if (role === 'employer') navigate('/employer/dashboard');
            else navigate('/student/dashboard');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-8">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <Link to="/" className="flex items-center gap-2 text-orange-600">
                            <ShieldCheck className="h-6 w-6" />
                            <span className="font-bold text-lg">HirePro</span>
                        </Link>
                        <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="pt-6">
                        <CardTitle className="text-2xl">
                            {step === 3 ? "Verify Email" : "Create your account"}
                        </CardTitle>
                        <CardDescription>
                            {step === 3
                                ? `We sent a code to ${formData.email}`
                                : "Join the verified employment marketplace."}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {step === 1 && (
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className={cn(
                                    "cursor-pointer rounded-xl border-2 p-4 hover:border-orange-600 transition-all",
                                    role === 'student' ? "border-orange-600 bg-orange-50" : "border-gray-200"
                                )}
                                onClick={() => setRole('student')}
                            >
                                <div className="mb-2 rounded-full bg-orange-100 w-10 h-10 flex items-center justify-center text-orange-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold">I'm a Student</h3>
                                <p className="text-sm text-gray-500 mt-1">Looking for verified jobs and internships.</p>
                            </div>

                            <div
                                className={cn(
                                    "cursor-pointer rounded-xl border-2 p-4 hover:border-orange-600 transition-all",
                                    role === 'employer' ? "border-orange-600 bg-orange-50" : "border-gray-200"
                                )}
                                onClick={() => setRole('employer')}
                            >
                                <div className="mb-2 rounded-full bg-orange-100 w-10 h-10 flex items-center justify-center text-orange-600">
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold">I'm an Employer</h3>
                                <p className="text-sm text-gray-500 mt-1">Hiring verified talent for my company.</p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{role === 'student' ? 'University Email' : 'Work Email'}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                                {role === 'employer' && formData.domain && (
                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" /> Domain detected: {formData.domain}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 text-center">
                            <div className="rounded-full bg-orange-50 w-16 h-16 mx-auto flex items-center justify-center text-orange-600">
                                <Mail className="h-8 w-8" />
                            </div>
                            <div className="flex justify-center gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-orange-600 focus:outline-none"
                                        disabled={isLoading}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">
                                Didn't receive code? <button
                                    type="button"
                                    onClick={resendOtp}
                                    disabled={isLoading}
                                    className="text-orange-600 font-semibold hover:underline disabled:opacity-50"
                                >
                                    Resend
                                </button>
                            </p>
                        </div>
                    )}

                    {step === 4 && role === 'student' && (
                        <div className="space-y-6 text-center">
                            <div className="rounded-full bg-orange-50 w-16 h-16 mx-auto flex items-center justify-center text-orange-600">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Verify your Identity</h3>
                                <p className="text-gray-500 text-sm mt-1">Upload a government-issued ID to get verified.</p>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf"
                                />
                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                {formData.file ? (
                                    <div className="flex items-center justify-center gap-2 text-green-600">
                                        <CheckCircle className="h-4 w-4" />
                                        <span className="text-sm font-medium">{formData.file.name}</span>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or PDF (max. 800x400px)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 4 && role === 'employer' && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Company Type</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['mnc', 'startup', 'individual'].map((type) => (
                                        <div
                                            key={type}
                                            className={cn(
                                                "cursor-pointer text-center p-2 rounded-md border text-sm capitalize transition-colors",
                                                formData.companyType === type
                                                    ? "bg-orange-50 border-orange-600 text-orange-700 font-medium"
                                                    : "border-gray-200 hover:bg-gray-50"
                                            )}
                                            onClick={() => setFormData({ ...formData, companyType: type })}
                                        >
                                            {type}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {formData.companyType === 'mnc' && (
                                <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded-md flex gap-2">
                                    <Building2 className="h-5 w-5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">MNC Verification</p>
                                        <p className="text-xs mt-1">We will verify your domain <strong>{formData.domain}</strong> against public records.</p>
                                    </div>
                                </div>
                            )}

                            {formData.companyType === 'startup' && (
                                <div className="space-y-2">
                                    <Label htmlFor="cin">CIN Number</Label>
                                    <Input
                                        id="cin"
                                        value={formData.cin}
                                        onChange={e => setFormData({ ...formData, cin: e.target.value })}
                                    />
                                </div>
                            )}

                            {formData.companyType === 'individual' && (
                                <div className="space-y-2">
                                    <Label htmlFor="pan">PAN Number</Label>
                                    <Input
                                        id="pan"
                                        value={formData.pan}
                                        onChange={e => setFormData({ ...formData, pan: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md flex items-center gap-2">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 ? (
                        <Button variant="outline" onClick={handleBack} disabled={isLoading}>Back</Button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {step < totalSteps ? (
                        <Button onClick={step === 3 ? verifyOtp : handleNext} disabled={isLoading}>
                            {isLoading ? 'Processing...' : (step === 3 ? "Verify OTP" : "Continue")}
                        </Button>
                    ) : (
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Complete Registration'}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
