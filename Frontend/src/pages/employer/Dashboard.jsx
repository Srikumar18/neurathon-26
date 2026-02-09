import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck, Briefcase, FileText, AlertTriangle, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export function EmployerDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, TechCorp Inc.</p>
                </div>
                <Link to="/employer/jobs/new">
                    <Button>Post a New Job</Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Credibility Score</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-700">98/100</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Top 5% of employers
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                        <Briefcase className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">12</div>
                        <p className="text-xs text-green-600 mt-1 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> +2 this week
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                        <FileText className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">1,234</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Across all listings
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Flags/Reports</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">0</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Clean record
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity / Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Job Postings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "Senior Frontend Engineer", status: "Active", applicants: 45, date: "2 days ago" },
                                { title: "Product Designer", status: "Active", applicants: 23, date: "5 days ago" },
                                { title: "Backend Developer", status: "Pending", applicants: 0, date: "Just now" },
                            ].map((job, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500">{job.date}</span>
                                            <span className="text-xs text-gray-300">•</span>
                                            <span className="text-xs text-blue-600">{job.applicants} applicants</span>
                                        </div>
                                    </div>
                                    <Badge variant={job.status === "Active" ? "success" : "warning"}>
                                        {job.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700">View All Jobs</Button>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Verification Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Business Identity</p>
                                        <p className="text-xs text-gray-500">Verified via DUNS</p>
                                    </div>
                                </div>
                                <Badge variant="success">Verified</Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Domain Ownership</p>
                                        <p className="text-xs text-gray-500">techcorp.com</p>
                                    </div>
                                </div>
                                <Badge variant="success">Verified</Badge>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h4 className="text-sm font-semibold text-blue-900 mb-1">Boost your Trust Score</h4>
                                <p className="text-xs text-blue-700 mb-3">Complete your company profile to reach 100/100 credibility.</p>
                                <Button size="sm" variant="outline" className="bg-white text-blue-700 border-blue-200">Complete Profile</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
