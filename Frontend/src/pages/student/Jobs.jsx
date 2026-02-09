import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { MapPin, DollarSign, Briefcase, Search, Filter, ShieldCheck, ThumbsUp, ThumbsDown, Bookmark, Rocket, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StudentJobs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState([
        { id: 1, title: "Junior Frontend Developer", company: "TechStart Inc", location: "Remote", salary: "$60k - $80k", match: 95, trust: "High", type: "Full-time" },
        { id: 2, title: "Product Design Intern", company: "Creative Studio", location: "New York, NY", salary: "$30/hr", match: 88, trust: "Verified", type: "Internship" },
        { id: 3, title: "Marketing Assistant", company: "Growth Co", location: "Chicago, IL", salary: "$50k - $60k", match: 75, trust: "Medium", type: "Full-time" },
        { id: 4, title: "Backend Engineer", company: "DataSystems", location: "Remote", salary: "$90k - $110k", match: 65, trust: "High", type: "Full-time" },
        { id: 5, title: "UX Researcher", company: "UserFirst", location: "San Francisco, CA", salary: "$80k - $100k", match: 60, trust: "Verified", type: "Contract" },
    ]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [hiddenJobs, setHiddenJobs] = useState([]);

    const handleAction = (id, action) => {
        if (action === 'skip') {
            setHiddenJobs(prev => [...prev, id]);
        } else if (action === 'save') {
            if (savedJobs.includes(id)) {
                setSavedJobs(prev => prev.filter(jobId => jobId !== id));
            } else {
                setSavedJobs(prev => [...prev, id]);
            }
        } else if (action === 'apply') {
            alert(`Applied to job ${id}! (Mock Action)`);
        }
    };


    const filteredJobs = jobs.filter(job =>
        !hiddenJobs.includes(job.id) &&
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
                    <p className="text-gray-500">Discover verified opportunities matched to your profile.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" /> Filters
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                    className="pl-10 h-12"
                    placeholder="Search by job title, company, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Job List */}
            <div className="grid gap-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <Card key={job.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                                            {job.trust === "High" && <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-200">High Trust</Badge>}
                                            {job.trust === "Verified" && <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Verified</Badge>}
                                        </div>
                                        <p className="text-gray-600 font-medium">{job.company}</p>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                                            <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {job.salary}</span>
                                            <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.type}</span>
                                        </div>

                                        {/* Quick Actions Tags */}
                                        <div className="flex flex-wrap items-center gap-2 mt-4">
                                            <Button
                                                size="sm"
                                                className="h-8 bg-orange-600 hover:bg-orange-700 text-white gap-1 rounded-full px-4"
                                                onClick={() => handleAction(job.id, 'apply')}
                                            >
                                                <Rocket className="h-3.5 w-3.5" /> Ready to Go
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 gap-1 rounded-full px-4 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                                                onClick={() => handleAction(job.id, 'skip')}
                                            >
                                                <X className="h-3.5 w-3.5" /> Skip
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className={
                                                    savedJobs.includes(job.id)
                                                        ? "h-8 gap-1 rounded-full px-3 text-orange-600 bg-orange-50"
                                                        : "h-8 gap-1 rounded-full px-3 text-gray-500 hover:text-orange-600 hover:bg-orange-50"
                                                }
                                                onClick={() => handleAction(job.id, 'save')}
                                            >
                                                <Bookmark className={savedJobs.includes(job.id) ? "h-3.5 w-3.5 fill-current" : "h-3.5 w-3.5"} />
                                                {savedJobs.includes(job.id) ? "Saved" : "Save"}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 min-w-[120px]">
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-green-600">{job.match}% Match</span>
                                            <p className="text-xs text-gray-400">Based on profile</p>
                                        </div>
                                        <Link to={`/student/jobs/${job.id}`}>
                                            <Button variant="secondary" className="w-full">View Details</Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>No jobs found matching "{searchTerm}"</p>
                        {hiddenJobs.length > 0 && (
                            <Button variant="link" onClick={() => setHiddenJobs([])} className="mt-2 text-orange-600">
                                Show {hiddenJobs.length} skipped jobs
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
