import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, Briefcase, FileText, Bell, LogOut, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function StudentLayout({ children }) {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/student/dashboard' },
        { icon: Briefcase, label: 'Find Jobs', href: '/student/jobs' },
        { icon: FileText, label: 'Applications', href: '/student/applications' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation Bar for Students */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                                <ShieldCheck className="h-8 w-8 text-orange-600" />
                                <span className="text-xl font-bold text-gray-900">HirePro</span>
                            </Link>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            className={cn(
                                                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                                                isActive ? "border-orange-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Button variant="ghost" size="icon">
                                    <Bell className="h-6 w-6 text-gray-400" />
                                </Button>
                            </div>
                            <div className="ml-3 relative flex items-center gap-3">
                                <div className="text-right hidden md:block">
                                    <div className="text-sm font-medium text-gray-900">Alex Student</div>
                                    <div className="text-xs text-green-600 flex items-center justify-end">
                                        <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <User className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {children}
            </main>
        </div>
    );
}
