import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Eye, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

export function Applicants() {
    const applicants = [
        { id: 1, name: "Alex Student", job: "Junior Frontend Developer", match: 95, status: "Review", date: "2 days ago" },
        { id: 2, name: "Jordan Smith", job: "Product Designer", match: 88, status: "Interview", date: "1 day ago" },
        { id: 3, name: "Casey Lee", job: "Backend Engineer", match: 72, status: "New", date: "4 hours ago" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Applicants</h1>

            <div className="flex gap-4">
                <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">All (12)</Button>
                <Button variant="ghost">Unread (3)</Button>
                <Button variant="ghost">Shortlisted (5)</Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                        {applicants.map(a => (
                            <div key={a.id} className="p-4 flex items-center justify-between hover:bg-gray-50 bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                        {a.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{a.name}</h3>
                                        <p className="text-sm text-gray-500">Applied for <span className="text-gray-700">{a.job}</span> • {a.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <span className="block font-bold text-green-600">{a.match}%</span>
                                        <span className="text-xs text-gray-400">Match</span>
                                    </div>
                                    <Badge variant="outline">{a.status}</Badge>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">Resume</Button>
                                        <Button size="sm">Message</Button>
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
