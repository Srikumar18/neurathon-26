import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MoreHorizontal } from 'lucide-react';

export function Users() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Card>
                <CardContent className="p-0">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Reports</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map(i => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium">User {i}</td>
                                    <td className="p-4">{i % 2 === 0 ? "Employer" : "Student"}</td>
                                    <td className="p-4"><Badge variant="success">Verified</Badge></td>
                                    <td className="p-4">0</td>
                                    <td className="p-4"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}
