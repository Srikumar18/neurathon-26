import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <ShieldCheck className="h-8 w-8 text-orange-600" />
                            <span className="text-xl font-bold text-gray-900">HirePro</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50">Home</Link>
                                <Link to="/login?role=student" className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">For Students</Link>
                                <Link to="/login?role=employer" className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">For Employers</Link>
                                <Link to="/about" className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">About Us</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost">Log in</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>Sign up</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">Home</Link>
                        <Link to="/login?role=student" className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">For Students</Link>
                        <Link to="/login?role=employer" className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">For Employers</Link>
                        <Link to="/about" className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">About Us</Link>
                        <div className="mt-4 flex flex-col gap-2">
                            <Link to="/login" className="w-full"><Button variant="ghost" className="w-full justify-start">Log in</Button></Link>
                            <Link to="/signup" className="w-full"><Button className="w-full">Sign up</Button></Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
