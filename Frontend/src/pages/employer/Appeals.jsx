import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export function Appeals() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Appeals Center</h1>
                <Button variant="outline">New Appeal</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">My Appeals</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-gray-500">
                        <CheckCircle className="h-12 w-12 mx-auto text-green-200 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Good Standing</h3>
                        <p>You have no active flags or appeals. Keep up the good work!</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
