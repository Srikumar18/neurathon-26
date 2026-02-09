import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge, Progress } from '../../components/ui/Badge';
import { ShieldCheck, MapPin, DollarSign, Clock, AlertTriangle, MessageSquare, ThumbsUp, ThumbsDown, User, Flag } from 'lucide-react';
import { cn } from '../../lib/utils'; // Keep this import for utility if needed

export function JobDetail() {
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { id: 1, text: "Interview process was very transparent.", sentiment: "positive", time: "2 days ago" },
        { id: 2, text: "Salary listed matches offer.", sentiment: "positive", time: "1 week ago" }
    ]);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setComments([{ id: Date.now(), text: comment, sentiment: "neutral", time: "Just now" }, ...comments]);
        setComment("");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Junior Frontend Developer</h1>
                                <div className="flex items-center gap-2 mt-2 text-gray-600">
                                    <span className="font-semibold text-blue-600">TechStart Inc</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Remote</span>
                                    <span>•</span>
                                    <span className="text-sm">Posted 2 days ago</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Badge variant="secondary" className="px-3 py-1 flex items-center gap-1"><DollarSign className="h-3 w-3" /> $60k - $80k / year</Badge>
                            <Badge variant="secondary" className="px-3 py-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Full-time</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-0">
                        <hr className="border-gray-100" />
                        <div>
                            <h3 className="font-bold text-lg mb-3">About the Role</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We are looking for a Junior Frontend Developer to join our growing team. You will be working with React, TypeScript, and Tailwind CSS to build modern web applications.
                                <br /><br />
                                This is a verified entry-level position suitable for recent graduates. We value learning and mentorship.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-3">Requirements</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Proficiency in JavaScript and React</li>
                                <li>Understanding of modern CSS and responsive design</li>
                                <li>Git version control basic knowledge</li>
                                <li>Willingness to learn and adapt</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-3">Hiring Timeline</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                <Clock className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-900">Immediate Start</p>
                                    <p>Interviews scheduled within 3 days of application.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Anonymous Comments */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Community Insights</h3>
                    <Card>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmitComment} className="flex gap-4 mb-6">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                    <User className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <input
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Share your anonymous feedback or experience..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <div className="flex justify-end mt-2">
                                        <Button size="sm" type="submit" disabled={!comment}>Post Anonymously</Button>
                                    </div>
                                </div>
                            </form>

                            <div className="space-y-4">
                                {comments.map(c => (
                                    <div key={c.id} className="flex gap-4">
                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                                            <MessageSquare className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-xs font-bold text-gray-500">Anonymous Student</span>
                                                <span className="text-xs text-gray-400">{c.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-700">{c.text}</p>
                                            <div className="mt-2 flex gap-3">
                                                {c.sentiment === 'positive' && <Badge variant="success" className="text-[10px] px-1.5 py-0 h-5">Positive Sentiment</Badge>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Trust Panel (Right Sidebar) */}
            <div className="space-y-6">
                <Card className="border-blue-100 bg-blue-50/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-blue-600" />
                            Trust Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Company Credibility</span>
                                <span className="font-bold text-green-600">95/100</span>
                            </div>
                            <Progress value={95} className="h-2" indicatorClassName="bg-green-600" />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Job Risk Level</span>
                                <span className="font-bold text-green-600">Low</span>
                            </div>
                            <Progress value={5} className="h-2" indicatorClassName="bg-green-600" />
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-100 text-sm space-y-2">
                            <div className="flex items-center gap-2 text-green-700">
                                <ShieldCheck className="h-4 w-4" /> Identity Verified
                            </div>
                            <div className="flex items-center gap-2 text-green-700">
                                <ShieldCheck className="h-4 w-4" /> Domain Validated
                            </div>
                            <div className="flex items-center gap-2 text-green-700">
                                <ShieldCheck className="h-4 w-4" /> Community Approved
                            </div>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Now</Button>

                        <div className="flex justify-center">
                            <button className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                                <Flag className="h-3 w-3" /> Report as Suspicious
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">About TechStart Inc</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                            TechStart is a leading innovator in software solutions. We prioritize employee growth and transparent hiring.
                        </p>
                        <a href="#" className="text-sm text-blue-600 font-medium hover:underline">View Verified Profile →</a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
