import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input, Label } from '../../components/ui/Input';
import { ShieldCheck, UserCheck, Upload, FileText, Globe, Github, Linkedin, Code, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function StudentDashboard() {
    const [resumeStatus, setResumeStatus] = useState('not_uploaded'); // 'not_uploaded', 'parsing', 'parsed'
    const [profile, setProfile] = useState({
        fullName: 'Alex Student',
        email: 'alex.student@university.edu',
        phone: '+1 (555) 0123-4567',
        education: 'B.S. Computer Science, State University (2024)',
        skills: 'React, Node.js, JavaScript, Tailwind CSS',
        experience: 'Intern at TechStart Inc (Summer 2023)',
        projects: 'E-commerce Dashboard, Task Manager App'
    });

    const [links, setLinks] = useState({
        github: 'https://github.com/alexstudent',
        linkedin: 'https://linkedin.com/in/alexstudent',
        leetcode: 'https://leetcode.com/alexstudent'
    });

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResumeStatus('parsing');
            // Simulate parsing delay
            setTimeout(() => {
                setResumeStatus('parsed');
                setProfile({
                    ...profile,
                    skills: 'React, Node.js, Python, AWS (Extracted from Resume)',
                    experience: 'Software Engineer Intern @ Google (Extracted)',
                    projects: 'HirePro Capstone (Extracted)'
                });
            }, 1500);
        }
    };

    const handleLinkChange = (key, value) => {
        setLinks(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-8">
            {/* Header / Welcome Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white border-none">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Welcome back, {profile.fullName}!</h2>
                                <p className="text-orange-100 mb-4">Complete your profile to get matched with top employers.</p>
                                <div className="flex items-center gap-2 bg-orange-800/50 p-2 rounded-lg inline-flex">
                                    <ShieldCheck className="h-5 w-5 text-green-400" />
                                    <span className="text-sm font-medium">Identity Verified via University ID</span>
                                </div>
                            </div>
                            <div className="bg-white/10 p-4 rounded-full">
                                <UserCheck className="h-10 w-10 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Profile Details & Resume */}
                <div className="md:col-span-2 space-y-8">

                    {/* 1. Profile Details Section */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-xl">Profile Details</CardTitle>
                            <Button variant="outline" size="sm">Edit Profile</Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-500">Full Name</Label>
                                    <div className="font-medium text-gray-900">{profile.fullName}</div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-500">Email</Label>
                                    <div className="font-medium text-gray-900">{profile.email}</div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-500">Phone</Label>
                                    <div className="font-medium text-gray-900">{profile.phone}</div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-500">Education</Label>
                                    <div className="font-medium text-gray-900">{profile.education}</div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="space-y-2">
                                    <Label className="text-gray-500">Skills</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.split(',').map((skill, i) => (
                                            <Badge key={i} variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-100">
                                                {skill.trim()}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-500">Experience</Label>
                                    <div className="font-medium text-gray-900 p-3 bg-gray-50 rounded-md border border-gray-100">
                                        {profile.experience}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-500">Projects</Label>
                                    <div className="font-medium text-gray-900 p-3 bg-gray-50 rounded-md border border-gray-100">
                                        {profile.projects}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Resume Upload Section */}
                    <Card className={cn("border-2 border-dashed transition-colors",
                        resumeStatus === 'parsed' ? "border-green-200 bg-green-50/30" : "border-gray-200"
                    )}>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-gray-500" />
                                Resume Parser
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                {resumeStatus === 'not_uploaded' && (
                                    <>
                                        <div className="bg-orange-50 p-4 rounded-full mb-4">
                                            <Upload className="h-8 w-8 text-orange-600" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Upload your Resume</h3>
                                        <p className="text-sm text-gray-500 mb-6 max-w-xs">
                                            Drag and drop or click to upload PDF/DOCX. We'll extract your details automatically.
                                        </p>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleResumeUpload}
                                                accept=".pdf,.docx"
                                            />
                                            <Button>Select Resume</Button>
                                        </div>
                                    </>
                                )}

                                {resumeStatus === 'parsing' && (
                                    <div className="flex flex-col items-center animate-pulse">
                                        <FileText className="h-10 w-10 text-orange-500 mb-4" />
                                        <p className="font-medium text-orange-600">Analyzing document...</p>
                                        <p className="text-xs text-gray-500">Extracting skills and experience</p>
                                    </div>
                                )}

                                {resumeStatus === 'parsed' && (
                                    <div className="flex flex-col items-center">
                                        <div className="bg-green-100 p-3 rounded-full mb-3">
                                            <CheckCircle className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h3 className="font-semibold text-green-800">Resume Parsed Successfully!</h3>
                                        <p className="text-sm text-green-600 mb-4">Your profile has been updated with extracted data.</p>
                                        <Button variant="outline" onClick={() => setResumeStatus('not_uploaded')}>Upload New</Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Social Links */}
                <div className="md:col-span-1 space-y-6">
                    {/* 3. Profile Links Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Social Profiles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Github className="h-4 w-4" /> GitHub
                                </Label>
                                <Input
                                    value={links.github}
                                    onChange={(e) => handleLinkChange('github', e.target.value)}
                                    placeholder="https://github.com/username"
                                />
                                {links.github && <a href={links.github} target="_blank" rel="noreferrer" className="text-xs text-orange-600 hover:underline flex justify-end">Test Link</a>}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4 text-orange-700" /> LinkedIn
                                </Label>
                                <Input
                                    value={links.linkedin}
                                    onChange={(e) => handleLinkChange('linkedin', e.target.value)}
                                    placeholder="https://linkedin.com/in/username"
                                />
                                {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-xs text-orange-600 hover:underline flex justify-end">Test Link</a>}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Code className="h-4 w-4 text-orange-500" /> LeetCode
                                </Label>
                                <Input
                                    value={links.leetcode}
                                    onChange={(e) => handleLinkChange('leetcode', e.target.value)}
                                    placeholder="https://leetcode.com/username"
                                />
                                {links.leetcode && <a href={links.leetcode} target="_blank" rel="noreferrer" className="text-xs text-orange-600 hover:underline flex justify-end">Test Link</a>}
                            </div>

                            <Button className="w-full mt-2" variant="outline">Save Links</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-orange-50 border-orange-100">
                        <CardContent className="p-4">
                            <div className="flex gap-3">
                                <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-orange-900 text-sm">Pro Tip</h4>
                                    <p className="text-xs text-orange-700 mt-1">
                                        Linking your GitHub and correctly formatting your resume increases your match score by 20%.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
