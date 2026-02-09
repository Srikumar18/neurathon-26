import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge, Progress } from '../../components/ui/Badge';
import { ShieldCheck, AlertTriangle, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const steps = ["Basics", "Description", "Skills", "Salary", "Timeline"];

export function JobPosting() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        type: "Full-time",
        description: "",
        skills: "",
        salaryMin: "",
        salaryMax: "",
        timeline: "Immediate"
    });

    // Validation State
    const [qualityScore, setQualityScore] = useState(0);
    const [salaryRealism, setSalaryRealism] = useState(true);
    const [fraudRisk, setFraudRisk] = useState(0); // 0-100, lower is better

    // Mock Validation Logic
    useEffect(() => {
        let score = 0;
        if (formData.title.length > 5) score += 20;
        if (formData.description.length > 20) score += 20;
        if (formData.skills.length > 5) score += 20;
        if (formData.salaryMin && formData.salaryMax) score += 20;
        setQualityScore(score);

        // Simple fraud detection mock
        if (formData.description.toLowerCase().includes("wire transfer") || formData.title.toLowerCase().includes("urgent")) {
            setFraudRisk(80);
        } else {
            setFraudRisk(10);
        }
    }, [formData]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        // Submit logic
        navigate('/employer/jobs');
    };

    return (
        <div className="flex gap-8">
            {/* Main Form Area */}
            <div className="flex-1 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Post a New Job</h1>
                    <p className="text-gray-500">Create a verified job listing to attract top talent.</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                        {steps.map((step, idx) => (
                            <span key={step} className={cn(idx <= currentStep ? "text-blue-600" : "text-gray-400")}>
                                {idx + 1}. {step}
                            </span>
                        ))}
                    </div>
                    <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
                </div>

                <Card>
                    <CardContent className="pt-6">
                        {currentStep === 0 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Job Title</Label>
                                    <Input
                                        placeholder="e.g. Senior Product Designer"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input
                                        placeholder="e.g. Remote, San Francisco, CA"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Job Type</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Job Description</Label>
                                    <textarea
                                        className="flex min-h-[200px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                        placeholder="Describe responsibilities, requirements, and culture..."
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Required Skills (comma separated)</Label>
                                    <Input
                                        placeholder="e.g. React, Node.js, Design Systems"
                                        value={formData.skills}
                                        onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Minimum Salary</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 80000"
                                        value={formData.salaryMin}
                                        onChange={e => setFormData({ ...formData, salaryMin: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Maximum Salary</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 120000"
                                        value={formData.salaryMax}
                                        onChange={e => setFormData({ ...formData, salaryMax: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Hiring Timeline</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                        value={formData.timeline}
                                        onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                                    >
                                        <option>Immediate Start</option>
                                        <option>Within 1 month</option>
                                        <option>1-3 months</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between mt-8">
                            {currentStep > 0 ? (
                                <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                            ) : <div />}

                            {currentStep < steps.length - 1 ? (
                                <Button onClick={handleNext}>Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    className="bg-green-600 hover:bg-green-700"
                                    disabled={fraudRisk > 50}
                                >
                                    Publish Job
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Validation Panel */}
            <div className="w-80 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Trust Audit</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Writing Quality</span>
                                <span className={cn("font-medium", qualityScore > 50 ? "text-green-600" : "text-yellow-600")}>{qualityScore}%</span>
                            </div>
                            <Progress value={qualityScore} className="h-1.5" indicatorClassName={qualityScore > 50 ? "bg-green-600" : "bg-yellow-500"} />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Fraud Risk</span>
                                <span className={cn("font-medium", fraudRisk < 30 ? "text-green-600" : "text-red-500")}>
                                    {fraudRisk < 30 ? "Low" : "High"}
                                </span>
                            </div>
                            <Progress value={fraudRisk} className="h-1.5" indicatorClassName={fraudRisk < 30 ? "bg-green-600" : "bg-red-500"} />
                            {fraudRisk > 50 && (
                                <p className="text-xs text-red-500 mt-1 flex items-center">
                                    <AlertTriangle className="h-3 w-3 mr-1" /> Flagged keywords detected
                                </p>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="text-sm font-semibold mb-2">Checklist</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    {formData.salaryMin ? <CheckCircle className="h-4 w-4 text-green-500" /> : <div className="h-4 w-4 rounded-full border border-gray-300" />}
                                    Salary Transparency
                                </li>
                                <li className="flex items-center gap-2">
                                    {formData.skills ? <CheckCircle className="h-4 w-4 text-green-500" /> : <div className="h-4 w-4 rounded-full border border-gray-300" />}
                                    Skills Definition
                                </li>
                                <li className="flex items-center gap-2">
                                    {qualityScore > 60 ? <CheckCircle className="h-4 w-4 text-green-500" /> : <div className="h-4 w-4 rounded-full border border-gray-300" />}
                                    Description Depth
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
