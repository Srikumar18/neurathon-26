import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ShieldCheck,
    LayoutDashboard,
    PlusCircle,
    Briefcase,
    Building2,
    Users,
    Bell,
    AlertTriangle,
    LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/employer/dashboard' },
    { icon: Building2, label: 'Company Profile', href: '/employer/profile' },
    { icon: Users, label: 'Recruiters', href: '/employer/recruiters' },
    { icon: Briefcase, label: 'Job Postings', href: '/employer/jobs' },
    { icon: FileText, label: 'Applicants', href: '/employer/applicants' }, // Fix missing icon import below if needed
    { icon: Bell, label: 'Notifications', href: '/employer/notifications' },
    { icon: AlertTriangle, label: 'Appeals', href: '/employer/appeals' },
];

import { FileText } from 'lucide-react'; // Added missing import

export function EmployerLayout({ children }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
                <div className="p-6">
                    <Link to="/" className="flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-orange-600" />
                        <span className="text-xl font-bold text-gray-900">HirePro</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="mb-6">
                        <Link to="/employer/jobs/new">
                            <Button className="w-full justify-start gap-2 bg-orange-600 hover:bg-orange-700">
                                <PlusCircle className="h-4 w-4" /> Post a Job
                            </Button>
                        </Link>
                    </div>

                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-orange-50 text-orange-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-orange-600" : "text-gray-400")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <Button variant="ghost" className="w-full justify-start text-gray-500 hover:text-red-600 hover:bg-red-50">
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
