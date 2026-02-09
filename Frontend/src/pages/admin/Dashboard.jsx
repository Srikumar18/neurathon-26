import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Moderation Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-red-50 border-red-100">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-red-600">Pending Flags</p>
                            <p className="text-3xl font-bold text-gray-900">12</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-yellow-100">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-yellow-600">Open Appeals</p>
                            <p className="text-3xl font-bold text-gray-900">5</p>
                        </div>
                        <Users className="h-8 w-8 text-yellow-500" />
                    </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-600">Verified Today</p>
                            <p className="text-3xl font-bold text-gray-900">45</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Flagged Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-gray-100">
                        {[
                            { type: "Job", title: "Suspicious Payment Request", reportedBy: "User123", risk: "High", date: "2 hours ago" },
                            { type: "User", title: "Fake Profile", reportedBy: "System", risk: "Medium", date: "5 hours ago" },
                            { type: "Comment", title: "Harassment", reportedBy: "User456", risk: "High", date: "1 day ago" },
                        ].map((item, i) => (
                            <div key={i} className="py-4 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="border-gray-200">{item.type}</Badge>
                                        <span className="font-semibold text-gray-900">{item.title}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">Reported by {item.reportedBy} • {item.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant={item.risk === "High" ? "destructive" : "warning"}>{item.risk} Risk</Badge>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">Ban</Button>
                                        <Button size="sm" variant="outline" className="text-gray-500">Dismiss</Button>
                                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">Review</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Icon component needed for the layout logic but not used in layout directly (only mapped)
// Importing Users locally to avoid error
import { Users } from 'lucide-react';
