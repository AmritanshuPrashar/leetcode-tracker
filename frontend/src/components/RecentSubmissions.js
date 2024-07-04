import React from 'react';

const RecentSubmissions = ({ submissions }) => {
    return (
        <div>
            <h3 className="text-xl font-bold mb-2 mt-10 text-[#EFEFEF]">Recent Submissions</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full rounded-md text-sm bg-[#0B0B0D] text-[#EFEFEF]">
                    <thead className="hidden md:table-header-group">
                        <tr className="bg-[#0073ff]">
                            <th className="px-4 py-2 text-left">Problem Statement</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Language</th>
                            <th className="px-4 py-2 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={index} className="border-t border-gray-700 md:table-row flex flex-col md:flex-row mb-4 md:mb-0">
                                <td className="px-4 py-2 md:border-none before:content-['Problem Statement:'] md:before:content-none">
                                    {submission.title}
                                </td>
                                <td className={`px-4 py-2 md:border-none before:content-['Status:'] md:before:content-none ${submission.statusDisplay === 'Accepted' ? 'text-[#34AAFF]' : 'text-red-500'}`}>
                                    {submission.statusDisplay}
                                </td>
                                <td className="px-4 py-2 md:border-none before:content-['Language:'] md:before:content-none">
                                    {submission.lang}
                                </td>
                                <td className="px-4 py-2 md:border-none before:content-['Date:'] md:before:content-none">
                                    {new Date(submission.timestamp * 1000).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentSubmissions;
