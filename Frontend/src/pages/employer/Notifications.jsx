import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Bell, Briefcase, ShieldCheck } from 'lucide-react';

export function Notifications() {
    const notifs = [
        { id: 1, title: "New application for Frontend Developer", desc: "Alex Student just applied.", time: "2 hours ago", type: "job" },
        { id: 2, title: "Credibility Score Increased!", desc: "Your score is now 98/100 after recent positive feedback.", time: "1 day ago", type: "trust" },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Notifications</h1>

            <div className="space-y-4">
                {notifs.map(n => (
                    <Card key={n.id} className="border-l-4 border-l-blue-600">
                        <CardContent className="p-4 flex gap-4">
                            <div className="mt-1">
                                {n.type === 'trust' ? <ShieldCheck className="text-green-600 h-5 w-5" /> : <Bell className="text-blue-600 h-5 w-5" />}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{n.title}</h4>
                                <p className="text-sm text-gray-600">{n.desc}</p>
                                <p className="text-xs text-gray-400 mt-2">{n.time}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
