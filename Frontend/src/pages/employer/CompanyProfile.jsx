import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck, Building2, MapPin, Globe } from 'lucide-react';

export function CompanyProfile() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Company Profile</h1>
                <Button>Save Changes</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Company Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Company Name</Label>
                                <Input defaultValue="TechCorp Inc." />
                            </div>
                            <div className="space-y-2">
                                <Label>Website</Label>
                                <Input defaultValue="https://techcorp.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Industry</Label>
                                <Input defaultValue="Software & Technology" />
                            </div>
                            <div className="space-y-2">
                                <Label>Size</Label>
                                <Input defaultValue="50-200 Employees" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <textarea className="w-full h-32 rounded-md border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" defaultValue="Leading provider of innovative software solutions..." />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Verification Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-green-600" />
                                    <span className="font-medium text-green-900">Verified</span>
                                </div>
                                <Badge variant="success">Active</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                                Your business identity has been verified via DUNS number.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Public Badge</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold mb-2">
                                    <ShieldCheck className="h-4 w-4" /> HirePro Verified
                                </div>
                                <p className="text-xs text-gray-500">Embed this badge on your careers page.</p>
                                <Button variant="outline" size="sm" className="mt-3 w-full">Copy Code</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
