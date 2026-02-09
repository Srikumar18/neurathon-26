import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { ShieldCheck } from 'lucide-react';

export function Login() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role'); // 'student' or 'employer'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple mock logic for demo purposes
        // If role is specified, prioritize that destination
        if (role === 'employer' || email.includes('employer')) {
            navigate('/employer/dashboard');
        } else {
            navigate('/student/dashboard');
        }
    };

    const getTitle = () => {
        if (role === 'employer') return 'Employer Login';
        if (role === 'student') return 'Student Login';
        return 'Welcome back';
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-orange-100 p-3">
                            <ShieldCheck className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">{getTitle()}</CardTitle>
                    <CardDescription className="text-center">
                        {role === 'employer'
                            ? 'Sign in to manage your company and jobs'
                            : role === 'student'
                                ? 'Sign in to apply for verified jobs'
                                : 'Enter your email to sign in to your account'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={role === 'employer' ? "name@company.com" : "student@university.edu"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {!role && (
                                <p className="text-xs text-gray-500">
                                    Tip: Use "employer" in email to see Employer Dashboard.
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link to="/forgot-password" className="text-sm text-orange-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            {role === 'employer' ? 'Sign in as Employer' : role === 'student' ? 'Sign in as Student' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant="outline" className="w-full">Google</Button>
                        <Button variant="outline" className="w-full">LinkedIn</Button>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-orange-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
