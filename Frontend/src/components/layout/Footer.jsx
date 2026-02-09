import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                            <span className="text-lg font-bold text-gray-900">TrustHire</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Building trust into hiring. Validated profiles, verified jobs, and a safer community for everyone.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">For Students</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">For Employers</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Help Center</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Safety Guidelines</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-400">&copy; 2026 TrustHire Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
