import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Mail, Trash2 } from 'lucide-react';

export function Recruiters() {
    const recruiters = [
        { id: 1, name: "Sarah Johnson", email: "sarah@techcorp.com", role: "Admin", status: "Active" },
        { id: 2, name: "Mike Chen", email: "mike@techcorp.com", role: "Recruiter", status: "Active" },
        { id: 3, name: "Emily Davis", email: "emily@techcorp.com", role: "Recruiter", status: "Pending" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Team Management</h1>
                    <p className="text-gray-500">Manage who can post jobs and review applicants.</p>
                </div>
                <Button>Invite Recruiter</Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-900">Name</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Role</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recruiters.map(r => (
                                <tr key={r.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{r.name}</div>
                                        <div className="text-gray-500 flex items-center gap-1">
                                            <Mail className="h-3 w-3" /> {r.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{r.role}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={r.status === "Active" ? "success" : "warning"}>{r.status}</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}
