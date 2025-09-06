// app/page.js
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// // Dynamically import the map component to avoid SSR issues
// const MapComponent = dynamic(() => import('../components/MapComponent'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
//       <p>Loading map...</p>
//     </div>
//   )
// });

// Loading component
function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
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
    <div className="fixed inset-0 bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center flex-col z-50">
      <div className="loader-spinner w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Rail Madad Control Room</h2>
        <p className="opacity-90">Initializing systems and loading data...</p>
      </div>
      <div className="w-80 h-2 bg-white bg-opacity-20 rounded-full mt-6 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

// Main page component
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [summary, setSummary] = useState({
    totalProblems: 0,
    problemsResolved: 0,
    averageResponseTime: null,
    priorityIssues: 0,
  });
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/problem");
        const data = await res.json();

        console.log(data)
        if (res.ok) {
          setSummary(data.summary);
          setProblems(data.data);
          // console.log(data.allComplaints)
        } else {
          console.error(" API error:", data.message);
        }
      } catch (error) {
        console.error(" Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const stats = [
    {
      title: "TOTAL PROBLEMS REPORTED",
      value: summary.totalProblems,
      trend: "up",
      trendText: "12% from last week",
    },
    {
      title: "PROBLEMS RESOLVED",
      value: summary.problemsResolved,
      trend: "up",
      trendText: "8% from last week",
    },
    {
      title: "AVERAGE RESPONSE TIME",
      value: summary.averageResponseTime ? `${summary.averageResponseTime}h` : "N/A",
      trend: "down",
      trendText: "5m faster than last week",
    },
    {
      title: "PRIORITY ISSUES",
      value: summary.priorityIssues || 0,
      trend: "up",
      trendText: "3 urgent issues",
    },
  ];


  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


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
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 h-full z-40 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="sidebar-header pb-4 border-b border-white border-opacity-10 text-center">
          <div className="train-icon text-3xl mb-2">🚆</div>
          <h2 className="text-xl font-bold">Rail Madad</h2>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2">
            {[
              "Dashboard",
              "Problems",
              "Map View",
              "Analytics",
              "Personnel",
              "Settings",
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    index === 0
                      ? "bg-white bg-opacity-10 border-l-4 border-white"
                      : "hover:bg-white hover:bg-opacity-5"
                  }`}
                >
                  <span className="mr-3">
                    {index === 0 && "🏠"}
                    {index === 1 && "⚠️"}
                    {index === 2 && "🗺️"}
                    {index === 3 && "📊"}
                    {index === 4 && "👥"}
                    {index === 5 && "⚙️"}
                  </span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer absolute bottom-4 left-0 right-0 text-center text-sm opacity-70">
          <p>AI-Powered Rail Assistance</p>
          <p>SIH Project © 2023</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="search-bar flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
            <span className="text-gray-400 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search problems..."
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="user-info flex items-center">
            <div className="notification-icon mr-4 text-gray-500">🔔</div>
            <div className="mr-4 text-sm hidden md:block">
              <div>Control Room Operator</div>
            </div>
            <div className="user-avatar w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              👤
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
            Control Room Dashboard
          </h1>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-sm text-gray-500 mb-2">{stat.title}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div
                  className={`text-xs flex items-center ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span
                    className={
                      stat.trend === "up" ? "mr-1" : "mr-1 transform rotate-180"
                    }
                  >
                    ↑
                  </span>
                  {stat.trendText}
                </div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { icon: "🔍", label: "All Status" },
              { icon: "↕️", label: "Sort by Newest" },
              { icon: "📅", label: "2023-10-05" },
            ].map((filter, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm px-4 py-2 flex items-center"
              >
                <span className="mr-2">{filter.icon}</span>
                <span className="text-sm">{filter.label}</span>
              </div>
            ))}
          </div>

          {/* Problems Table */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Problems
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b text-gray-600 text-sm">
                    <th className="pb-3">Train No.</th>
                    <th className="pb-3">Caoch No.</th>
                    <th className="pb-3">Pnr No.</th>
                    <th className="pb-3">Complaint Details</th>
                    <th className="pb-3">complaints Mobile No. </th>
                    <th className="pb-3">Department </th>
                    <th className="pb-3">Assigned To</th>
                    <th className="pb-3">Assigned Mobile No.</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 text-sm"
                    >
                      <td className="py-4">{problem.trainNo}</td>
                      <td className="py-4">{problem.coachNo}</td>
                      <td className="py-4">{problem.pnrNumber}</td>
                      <td className="py-4">{problem.details}</td>
                      <td className="py-4">{problem.details}</td>
                      <td className="py-4">{problem.department}</td>
                      <td className="py-4">{problem.assignedTo.name}</td>
                      <td className="py-4">{problem.assignedTo.phone}</td>
                      <td className="py-4">{problem.status}</td>
                      <td className="py-4">
                        <span
                          className={
                            problem.priority === "High"
                              ? "text-red-600 font-semibold"
                              : problem.priority === "Medium"
                              ? "text-yellow-600 font-semibold"
                              : "text-green-600 font-semibold"
                          }
                        >
                          {problem.priority}
                        </span>
                      </td>
                      <td className="py-4">
                        <span
                          className={
                            problem.status === "New"
                              ? "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                              : problem.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
                              : "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
                          }
                        >
                          {problem.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
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
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Problem Locations
            </h2>
            {/* <MapComponent /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
