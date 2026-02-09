import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function StudentApplications() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Applications</h1>
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                        <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <h3 className="font-semibold text-gray-900">Junior Frontend Developer</h3>
                                <p className="text-sm text-gray-500">TechStart Inc • Applied 2 days ago</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Interview Scheduled</Badge>
                        </div>
                        <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <h3 className="font-semibold text-gray-900">Product Design Intern</h3>
                                <p className="text-sm text-gray-500">Creative Studio • Applied 1 week ago</p>
                            </div>
                            <Badge variant="secondary">Under Review</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
