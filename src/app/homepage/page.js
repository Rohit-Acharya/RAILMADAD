// app/page.js
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Loading component
function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center flex-col z-50"
      style={{
        backgroundImage: "url('https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66baf0c1e6330-indian-railways-cancels-rs-30-000-crore-tender-for-100-vande-bharat-trains-133600489-16x9.jpg?size=948:533')",
      }}
    >
      {/* White fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white"></div>

      {/* Content wrapper with glass effect */}
      <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center max-w-md w-full">

        {/* Spinner with glow */}
        <div className="loader-spinner w-16 h-16 border-4 border-white/60 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-lg shadow-white/30"></div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-black drop-shadow-lg mb-2">
          Rail Madad Control Room
        </h2>
        <p className="text-black/90 text-sm mb-6">
          Initializing systems and loading data...
        </p>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

// Main page component
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Sample data
  const problems = [
    {
      id: 'RM2023-107',
      type: 'Track Obstruction',
      location: 'Mumbai Central, Platform 5',
      reportedAt: 'Today, 10:23 AM',
      priority: 'High',
      status: 'New'
    },
    {
      id: 'RM2023-106',
      type: 'Electrical Fault',
      location: 'Western Line, Borivali Station',
      reportedAt: 'Today, 09:45 AM',
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      id: 'RM2023-105',
      type: 'Signal Problem',
      location: 'Central Line, Kurla Junction',
      reportedAt: 'Today, 08:12 AM',
      priority: 'High',
      status: 'New'
    },
    {
      id: 'RM2023-104',
      type: 'Coach Maintenance',
      location: 'Ahmedabad Station, Coach #B3',
      reportedAt: 'Yesterday, 05:30 PM',
      priority: 'Low',
      status: 'In Progress'
    },
    {
      id: 'RM2023-103',
      type: 'AC Not Working',
      location: 'Rajdhani Express, Coach #A1',
      reportedAt: 'Yesterday, 02:15 PM',
      priority: 'Medium',
      status: 'Resolved'
    }
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="sr-only">Toggle menu</span>
      </button>

      {/* Active tab indicator for mobile */}
      <div className="md:hidden fixed top-16 left-16 z-40 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
        {activeTab}
      </div>

     <aside
  className={`fixed md:relative w-72 text-white p-5 h-full z-40 transition-transform duration-300 ${
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
  }`}
  style={{
    backgroundImage: `linear-gradient(rgba(0, 35, 80, 0.85), rgba(0, 35, 80, 0.85)), url('/rail.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 0 25px rgba(0, 0, 0, 0.2)'
  }}
>
  {/* Content wrapper */}
  <div className="relative z-10 h-full flex flex-col">
    {/* Header */}
    <div className="sidebar-header pb-6 border-b border-white/30 text-center">
      <div className="train-icon text-4xl mb-3">🚆</div>
      <h2 className="text-2xl font-bold text-white drop-shadow-md">Rail Madad</h2>
      <h2 className="text-lg font-semibold text-amber-300 drop-shadow-md">INDIAN RAILWAYS</h2>
    </div>

    {/* Navigation */}
    <nav className="mt-8 flex-grow">
      <ul className="space-y-3">
        {['Dashboard', 'Problems', 'Map View', 'Analytics', 'Personnel', 'Settings'].map((item, index) => (
          <li key={index}>
            <a
              href="#"
              className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
                activeTab === item
                  ? 'bg-amber-300 text-gray-900 border-l-4 border-amber-600 font-bold shadow-md'
                  : 'hover:bg-white/20 hover:border-l-4 hover:border-amber-400/50'
              }`}
              onClick={() => setActiveTab(item)}
            >
              <span className="mr-4 text-xl">
                {index === 0 && '🏠'}
                {index === 1 && '⚠️'}
                {index === 2 && '🗺️'}
                {index === 3 && '📊'}
                {index === 4 && '👥'}
                {index === 5 && '⚙️'}
              </span>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    {/* Footer */}
    <div className="sidebar-footer text-center text-sm mt-4 text-white/90">
      <p className="font-medium">AI-Powered Rail Assistance</p>
      <p className="text-xs mt-1">SIH Project © 2025</p>
    </div>
  </div>
</aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-violet-900 mr-4">{activeTab}</h1>
            <div className="search-bar flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="Search problems..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="user-info flex items-center">
            <div className="notification-icon mr-4 text-gray-500">🔔</div>
            <div className="mr-4 text-sm hidden md:block">
              <div>Control Room Operator</div>
            </div>
            <div className="user-avatar w-10 h-10 bg-amber-300 rounded-full flex items-center justify-center text-white">
              👤
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Only show this heading if we're on the Dashboard */}
          {activeTab === 'Dashboard' && (
            <h1 className="text-2xl font-bold text-violet-900 mb-6 pb-2 border-b">Control Room Dashboard</h1>
          )}

          {/* Dashboard-specific content */}
          {activeTab === 'Dashboard' && (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                  { title: 'TOTAL PROBLEMS REPORTED', value: '142', trend: 'up', trendText: '12% from last week' },
                  { title: 'PROBLEMS RESOLVED', value: '89', trend: 'up', trendText: '8% from last week' },
                  { title: 'AVERAGE RESPONSE TIME', value: '23m', trend: 'down', trendText: '5m faster than last week' },
                  { title: 'PRIORITY ISSUES', value: '12', trend: 'up', trendText: '3 urgent issues' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="text-sm text-gray-500 mb-2">{stat.title}</h3>
                    <div className="text-3xl font-bold text-violet-900 mb-2">{stat.value}</div>
                    <div className={`text-xs flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      <span className={stat.trend === 'up' ? 'mr-1' : 'mr-1 transform rotate-180'}>↑</span>
                      {stat.trendText}
                    </div>
                  </div>
                ))}
              </div>

              {/* Filter Bar */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: '🔍', label: 'All Status' },
                  { icon: '↕️', label: 'Sort by Newest' },
                  { icon: '📅', label: '2023-10-05' }
                ].map((filter, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm px-4 py-2 flex items-center">
                    <span className="mr-2">{filter.icon}</span>
                    <span className="text-sm">{filter.label}</span>
                  </div>
                ))}
              </div>

              {/* Problems Table */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Problems</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b text-gray-600 text-sm">
                        <th className="pb-3">ID</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Location</th>
                        <th className="pb-3">Reported At</th>
                        <th className="pb-3">Priority</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {problems.map((problem, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                          <td className="py-4">{problem.id}</td>
                          <td className="py-4">{problem.type}</td>
                          <td className="py-4">{problem.location}</td>
                          <td className="py-4">{problem.reportedAt}</td>
                          <td className="py-4">
                            <span className={
                              problem.priority === 'High' ? 'text-red-600 font-semibold' :
                                problem.priority === 'Medium' ? 'text-yellow-600 font-semibold' :
                                  'text-green-600 font-semibold'
                            }>
                              {problem.priority}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className={
                              problem.status === 'New' ? 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs' :
                                problem.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs' :
                                  'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs'
                            }>
                              {problem.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <button className="bg-violet-900 text-white px-3 py-1 rounded-md text-sm hover:bg-violet-900 transition-colors">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Map View */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Problem Locations</h2>
                {/* <MapComponent /> */}
              </div>
            </>
          )}

          {/* Placeholder content for other tabs */}
          {activeTab !== 'Dashboard' && (
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-4">
                  {activeTab === 'Problems' && '⚠️'}
                  {activeTab === 'Map View' && '🗺️'}
                  {activeTab === 'Analytics' && '📊'}
                  {activeTab === 'Personnel' && '👥'}
                  {activeTab === 'Settings' && '⚙️'}
                </div>
                <h2 className="text-xl font-semibold">{activeTab} View</h2>
                <p className="mt-2">This section is under development</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}