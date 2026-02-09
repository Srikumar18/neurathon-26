import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ShieldAlert,
    Users,
    FileText,
    MessageSquare,
    LogOut,
    ShieldCheck,
    AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

const sidebarItems = [
    { icon: ShieldAlert, label: 'Moderation Queue', href: '/admin/dashboard' },
    { icon: Users, label: 'Reported Users', href: '/admin/users' },
    { icon: FileText, label: 'Flagged Jobs', href: '/admin/jobs' },
    { icon: MessageSquare, label: 'Comments', href: '/admin/comments' },
    { icon: AlertTriangle, label: 'Appeals', href: '/admin/appeals' },
];

export function AdminLayout({ children }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white fixed h-full z-10 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <Link to="/" className="flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-orange-500" />
                        <span className="text-xl font-bold">TrustHire Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800">
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
