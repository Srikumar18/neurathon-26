import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export function EmployerJobs() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Jobs</h1>
                <Link to="/employer/jobs/new">
                    <Button>Post New Job</Button>
                </Link>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                        {[1, 2, 3].map((job) => (
                            <div key={job} className="p-4 flex items-center justify-between hover:bg-gray-50 bg-white">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Senior React Developer</h3>
                                    <p className="text-sm text-gray-500">Posted 2 days ago • Remote</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="success">Active</Badge>
                                    <div className="text-sm font-medium text-gray-900">45 Applicants</div>
                                    <Button variant="outline" size="sm">Manage</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
