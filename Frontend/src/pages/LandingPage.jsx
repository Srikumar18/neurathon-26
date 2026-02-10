import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { ShieldCheck, UserCheck, Scale, FileText, CheckCircle } from 'lucide-react';

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-white py-20 lg:py-32">
                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
                            Building <span className="text-orange-600">trust</span> into hiring.
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            HirePro is the fraud-resistant employment marketplace. We verify every identity, validate every job, and build a safer community for students and employers.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/signup">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8">Get Started</Button>
                            </Link>
                            <Link to="/employer/dashboard">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8">For Employers</Button>
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-orange-600" /> Verified Jobs</span>
                            <span className="flex items-center gap-1"><UserCheck className="w-4 h-4 text-orange-600" /> Verified Identities</span>
                            <span className="flex items-center gap-1"><Scale className="w-4 h-4 text-orange-600" /> Community Moderated</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Why HirePro?</h2>
                        <p className="mt-4 text-gray-600">We've redesigned the hiring process to eliminate fraud and ghosting.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 text-orange-600">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <CardTitle>Identity Verification</CardTitle>
                                <CardDescription>
                                    Every student and employer must verify their identity with government ID before joining.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 text-orange-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <CardTitle>AI & Community Review</CardTitle>
                                <CardDescription>
                                    Jobs are scanned for fraud signals and community-validated before going live.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 text-orange-600">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <CardTitle>Fair Appeals Process</CardTitle>
                                <CardDescription>
                                    Transparent moderation with a clear appeals process for any flagged content.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">How HirePro Works</h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 w-0.5 h-full bg-gray-200 hidden md:block" style={{ transform: 'translateX(-50%)' }}></div>

                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row items-center justify-between relative">
                                <div className="md:w-5/12 text-center md:text-right pr-0 md:pr-10 order-2 md:order-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">1. Verify Identity</h3>
                                    <p className="text-gray-600">Upload government ID to prove you're real. We perform biometric matching to ensure safety.</p>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-orange-600 border-4 border-white flex items-center justify-center z-10 hidden md:flex">
                                    <span className="text-white text-xs font-bold">1</span>
                                </div>
                                <div className="md:w-5/12 pl-0 md:pl-10 order-1 md:order-2 mb-4 md:mb-0">
                                    <div className="bg-gray-100 rounded-lg p-6 h-32 flex items-center justify-center">
                                        <UserCheck className="w-10 h-10 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between relative">
                                <div className="md:w-5/12 text-center md:text-right pr-0 md:pr-10 order-2 md:order-1 hidden md:block">
                                    <div className="bg-gray-100 rounded-lg p-6 h-32 flex items-center justify-center">
                                        <FileText className="w-10 h-10 text-gray-400" />
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-orange-600 border-4 border-white flex items-center justify-center z-10 hidden md:flex">
                                    <span className="text-white text-xs font-bold">2</span>
                                </div>
                                <div className="md:w-5/12 pl-0 md:pl-10 order-1 md:order-2">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">2. Validate Jobs</h3>
                                    <p className="text-gray-600">Employers post jobs through our AI-guided wizard that checks for quality, salary realism, and fraud.</p>
                                    <div className="bg-gray-100 rounded-lg p-6 h-32 flex items-center justify-center md:hidden mt-4">
                                        <FileText className="w-10 h-10 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between relative">
                                <div className="md:w-5/12 text-center md:text-right pr-0 md:pr-10 order-2 md:order-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">3. Safe Connections</h3>
                                    <p className="text-gray-600">Apply to jobs with confidence. Our community moderation ensures bad actors are removed instantly.</p>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-orange-600 border-4 border-white flex items-center justify-center z-10 hidden md:flex">
                                    <span className="text-white text-xs font-bold">3</span>
                                </div>
                                <div className="md:w-5/12 pl-0 md:pl-10 order-1 md:order-2 mb-4 md:mb-0">
                                    <div className="bg-gray-100 rounded-lg p-6 h-32 flex items-center justify-center">
                                        <CheckCircle className="w-10 h-10 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-orange-600 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to join a safer marketplace?</h2>
                    <p className="text-orange-100 mb-8 max-w-2xl mx-auto">Join thousands of verified students and quality employers building the future of hiring.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/signup">
                            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 w-full sm:w-auto text-lg h-12 px-8">Create Verified Account</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
