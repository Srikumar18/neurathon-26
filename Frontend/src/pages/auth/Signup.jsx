import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Badge';
import { ShieldCheck, User, Briefcase, Upload, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Signup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('student'); // 'student' or 'employer'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        file: null
    });

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleSubmit = () => {
        // Submit logic mock
        console.log("Submitting", formData);
        if (role === 'employer') {
            navigate('/employer/dashboard');
        } else {
            navigate('/student/dashboard');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-8">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <Link to="/" className="flex items-center gap-2 text-orange-600">
                            <ShieldCheck className="h-6 w-6" />
                            <span className="font-bold text-lg">TrustHire</span>
                        </Link>
                        <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="pt-6">
                        <CardTitle className="text-2xl">Create your account</CardTitle>
                        <CardDescription>Join the verified employment marketplace.</CardDescription>
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
                                <Label htmlFor="email">{role === 'student' ? 'University Email (Optional)' : 'Work Email'}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
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

                            <div className="flex items-start gap-3 p-3 bg-orange-50 text-orange-700 rounded-lg text-left text-sm">
                                <ShieldCheck className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p>Your data is encrypted. We only use this for one-time verification and do not store raw ID images.</p>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 ? (
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {step < totalSteps ? (
                        <Button onClick={handleNext}>Continue</Button>
                    ) : (
                        <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>Complete Verification</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
