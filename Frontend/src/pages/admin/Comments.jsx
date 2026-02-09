import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Flag, Trash } from 'lucide-react';

export function Comments() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Comment Moderation</h1>
            <div className="space-y-4">
                <Card>
                    <CardContent className="p-4 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="destructive">Flagged</Badge>
                                <span className="text-sm text-gray-500">reported by User123</span>
                            </div>
                            <p className="font-medium">"This company provides fake offers!"</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                            <Button size="sm" variant="outline">Dismiss</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
