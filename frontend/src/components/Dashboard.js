import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SubmissionsChart from './SubmissionsChart';
import RecentSubmissions from './RecentSubmissions';
import Header from './Header';
import { BarLoader } from 'react-spinners';
import '../App.css';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [user, setUser] = useState('');
    const [fetchData, setFetchData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (fetchData) {
            setLoading(true);
            fetch(`https://leetcode-tracker-backend.onrender.com/${user}`)
                .then(response => response.json())
                .then(data => {
                    if (data.message === "No user Found") {
                        setError("User with this username not exists");
                        setData(null);
                    } else {
                        setError(null);
                        setData(data);
                    }
                })
                .catch(() => {
                    setError("An error occurred while fetching data");
                    setData(null);
                })
                .finally(() => {
                    setFetchData(false);
                    setLoading(false);
                });
        }
    }, [fetchData, user]);

    const handleFetchData = () => {
        setData(null);
        setFetchData(true);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleFetchData();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="p-4 min-h-screen bg-[#0B0B0D] text-[#EFEFEF] relative">
            <Header />
            <div className="flex justify-center mb-6 mt-5">
                <div className="relative w-full max-w-xs h-10 mt-5">
                    <input
                        type='text'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="peer w-full h-full bg-transparent text-[#FFFFFF] font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-[#0B0B0D] disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-[#EFEFEF] placeholder-shown:border-t-[#EFEFEF] border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-[#EFEFEF] focus:border-[#34AAFF]"
                        placeholder=" "
                    />
                    <label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-[#EFEFEF] leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-[#EFEFEF] transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-[#EFEFEF] peer-focus:text-[#34AAFF] before:border-[#EFEFEF] peer-focus:before:!border-[#34AAFF] after:border-[#EFEFEF] peer-focus:after:!border-[#34AAFF]"
                    >
                        Username
                    </label>
                </div>
                <button
                    onClick={handleFetchData}
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-[7px] bg-[#2A60FE] text-[#FFFFFF] shadow-md hover:shadow-lg hover:bg-[#0071B2] focus:opacity-85 active:opacity-85 ml-2 h-10 mt-5"
                    type="button"
                    data-ripple-light="true"
                >
                    Fetch Data
                </button>
            </div>
            <div className="mb-4 text-middle">
            {loading ? (
                <>
                    <div className="flex justify-center items-center h-full">
                        <BarLoader size={6} color="#0377ff" />
                    </div>
                    <div className='block text-center mt-2 font-sans text-base antialiased font-light leading-relaxed'>
                        <p>Loading data...</p>
                        <p className='ml-5 text-[10px] mt-1'>(Can take a minute, as the server is starting up)</p>
                    </div>
                </>
            ) : data ? (
                <>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed">Total Solved: {data.totalSolved}</p>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed">Ranking: {data.ranking}</p>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed">Contribution Points: {data.contributionPoint}</p>
                </>
            ) : (
                <p className="text-lg font-sans antialiased font-light leading-relaxed">No data available. Please fetch data for a user.</p>
            )}
            
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {data && (
                <div className="flex flex-col items-center">
                    <div className="w-full md:w-3/4 p-2 border border-[#34AAFF] mb-4" style={{ height: '400px', overflowY: 'auto' }}>
                        <h3 className="text-xl font-semibold mb-2 text-center text-[#FFFFFF]">Solved Problems Breakdown</h3>
                        <SubmissionsChart
                            easySolved={data.easySolved}
                            totalEasy={data.totalEasy}
                            mediumSolved={data.mediumSolved}
                            totalMedium={data.totalMedium}
                            hardSolved={data.hardSolved}
                            totalHard={data.totalHard}
                        />
                    </div>
                    <div className="w-full md:w-3/4 p-2 border border-[#34AAFF] mb-4">
                        <h3 className="text-xl font-semibold mb-2 text-center text-[#FFFFFF]">Submission Calendar</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={Object.keys(data.submissionCalendar).map(key => ({ date: new Date(parseInt(key) * 1000).toLocaleDateString(), count: data.submissionCalendar[key] }))}>
                                <XAxis dataKey="date" fontSize="10px" stroke="#EFEFEF" />
                                <YAxis fontSize="10px" stroke="#EFEFEF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0B0B0D', color: '#FFFFFF' }}
                                    labelStyle={{ color: '#FFFFFF' }}
                                />
                                <Bar dataKey="count" fill="#34AAFF" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
            {data && <RecentSubmissions submissions={data.recentSubmissions} />}
        </div>
    );
};

export default Dashboard;
