import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function AdminAppeals() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Appeals</h1>
            <div className="space-y-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <h3 className="font-semibold">Appeal #1024 - Job Removal</h3>
                            <Badge variant="warning">Open</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Employer provided proof of legitimacy. Reviewing documents...</p>
                        <div className="mt-4 flex gap-2">
                            <Button size="sm">Review Details</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
