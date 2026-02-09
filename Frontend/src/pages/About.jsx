import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { ShieldCheck, Users, Target, Lock } from 'lucide-react';

export function About() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-orange-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
                        Our Mission is <span className="text-orange-600">Trust</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We are redefining the employment landscape by building the world's first fraud-resistant hiring marketplace. No fake profiles, no ghost jobs, just real connections.
                    </p>
                </div>
            </section>

            {/* The Problem & Solution */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why we started</h2>
                            <p className="text-gray-600 mb-4 text-lg">
                                The modern hiring process is broken. Recruitment scams are at an all-time high, and "ghost jobs" waste millions of hours for job seekers every year.
                            </p>
                            <p className="text-gray-600 text-lg">
                                TrustHire was born from a simple idea: <strong>What if everyone on a diverse career platform verified their identity first?</strong> By removing anonymity, we remove the bad actors.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-orange-50 border-none">
                                <CardContent className="p-6 text-center">
                                    <div className="rounded-full bg-white p-3 inline-flex mb-4 shadow-sm">
                                        <Lock className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Safety First</h3>
                                </CardContent>
                            </Card>
                            <Card className="bg-gray-50 border-none">
                                <CardContent className="p-6 text-center">
                                    <div className="rounded-full bg-white p-3 inline-flex mb-4 shadow-sm">
                                        <Users className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Real People</h3>
                                </CardContent>
                            </Card>
                            <Card className="bg-gray-50 border-none">
                                <CardContent className="p-6 text-center">
                                    <div className="rounded-full bg-white p-3 inline-flex mb-4 shadow-sm">
                                        <Target className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Validated Jobs</h3>
                                </CardContent>
                            </Card>
                            <Card className="bg-orange-600 border-none text-white">
                                <CardContent className="p-6 text-center">
                                    <div className="rounded-full bg-white/20 p-3 inline-flex mb-4">
                                        <ShieldCheck className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-bold">100% Verified</h3>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Our Core Principles</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Identity is Key</h3>
                            <p className="text-gray-600">
                                We believe that trust begins with identity. By verifying government IDs for all users, we create a baseline of safety that other platforms cannot match.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Radical Transparency</h3>
                            <p className="text-gray-600">
                                Job seekers deserve to know if a job is real. Employers deserve to know if a candidate is genuine. We bring transparency to every interaction.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Community Moderation</h3>
                            <p className="text-gray-600">
                                Our community is our strongest defense. We empower users to flag suspicious activity and reward those who help keep the platform safe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
