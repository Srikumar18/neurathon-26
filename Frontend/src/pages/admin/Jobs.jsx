import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function AdminJobs() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Job Moderation</h1>
            <Card>
                <CardContent className="p-0">
                    <div className="p-4 text-center text-gray-500">
                        <p>All jobs are currently safe.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
