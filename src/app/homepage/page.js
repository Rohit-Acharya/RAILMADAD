// app/page.js
"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Train,
  AlertCircle,
  MapPin,
  BarChart2,
  Users,
  Settings,
  Bell,
  User,
  Search
} from "lucide-react";

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
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center flex-col z-50"
      style={{
        backgroundImage:
          "url('https://akm-img-a-in.tosshub.com/businesstoday/images/story/202408/66baf0c1e6330-indian-railways-cancels-rs-30-000-crore-tender-for-100-vande-bharat-trains-133600489-16x9.jpg?size=948:533')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white"></div>
      <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="loader-spinner w-16 h-16 border-4 border-white/60 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-lg shadow-white/30"></div>
        <h2 className="text-3xl font-bold text-black drop-shadow-lg mb-2">
          Rail Madad Control Room
        </h2>
        <p className="text-black/90 text-sm mb-6">
          Initializing systems and loading data...
        </p>
        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [problems, setProblems] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("/api/problem");
        const data = await res.json();
        setProblems(data.data);
        setSummary(data.summary);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
        setIsLoading(false);
      }
    };
    fetchProblems();
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
      value: summary.averageResponseTime,
      trend: "down",
      trendText: "5m faster than last week",
    },
    {
      title: "PRIORITY ISSUES",
      value: "",
      trend: "up",
      trendText: "3 urgent issues",
    },
  ];

  if (isLoading) return <Loading />;

  const navItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Problems", icon: <AlertCircle className="w-5 h-5" /> },
    { name: "Map View", icon: <MapPin className="w-5 h-5" /> },
    { name: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { name: "Personnel", icon: <Users className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-72 text-white p-5 h-full z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 35, 80, 0.85), rgba(0, 35, 80, 0.85)), url('/rail.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="relative z-10 h-full flex flex-col">
          <div className="pb-6 border-b border-white/30 text-center">
            <div className="text-4xl mb-3">
              <Train className="inline w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Rail Madad</h2>
            <h2 className="text-lg font-semibold text-amber-300">
              INDIAN RAILWAYS
            </h2>
          </div>

          <nav className="mt-8 flex-grow">
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button
                    className={`w-full text-left flex items-center p-4 rounded-xl transition-all duration-200 ${
                      activeTab === item.name
                        ? "bg-amber-300 text-gray-900 border-l-4 border-amber-600 font-bold shadow-md"
                        : "hover:bg-white/20 hover:border-l-4 hover:border-amber-400/50"
                    }`}
                    onClick={() => setActiveTab(item.name)}
                  >
                    <span className="mr-4">{item.icon}</span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center text-sm mt-4 text-white/90">
            <p className="font-medium">AI-Powered Rail Assistance</p>
            <p className="text-xs mt-1">SIH Project © 2025</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-violet-900 mr-4">
              {activeTab}
            </h1>
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search problems..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-500 mr-4" />
            <div className="mr-4 text-sm hidden md:block">
              <div>Control Room Operator</div>
            </div>
            <div className="w-10 h-10 bg-amber-300 rounded-full flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "Dashboard" && (
            <>
              <h1 className="text-2xl font-bold text-violet-900 mb-6 pb-2 border-b">
                Control Room Dashboard
              </h1>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-5"
                  >
                    <h3 className="text-sm text-gray-500 mb-2">{stat.title}</h3>
                    <div className="text-3xl font-bold text-violet-900 mb-2">
                      {stat.value}
                    </div>
                    <div
                      className={`text-xs flex items-center ${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      <span
                        className={`mr-1 ${
                          stat.trend === "down" ? "transform rotate-180" : ""
                        }`}
                      >
                        ↑
                      </span>
                      {stat.trendText}
                    </div>
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
                        <th className="pb-3">Coach No.</th>
                        <th className="pb-3">PNR No.</th>
                        <th className="pb-3">User mobile</th>
                        <th className="pb-3">Complaint Details</th>
                        <th className="pb-3">Assigned Details</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {problems.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center py-6 text-gray-500"
                          >
                            No data available
                          </td>
                        </tr>
                      ) : (
                        problems.map((problem, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-gray-50 text-sm"
                          >
                            <td className="py-4">{problem.trainNo}</td>
                            <td className="py-4">{problem.coachNo}</td>
                            <td className="py-4">{problem.pnrNumber}</td>
                            <td className="py-4">{problem.userPhone}</td>
                            <td className="py-4">{problem.details}</td>
                            <td className="py-4">
                              <div className="font-medium text-gray-800">
                                Name: {problem.assignedTo?.name || "-"}
                              </div>
                              <div className="text-sm text-gray-500">
                                Mobile: {problem.assignedTo?.phone || "-"}
                              </div>
                              <div className="text-sm text-gray-500">
                                Department: {problem.assignedTo?.department || "-"}
                              </div>
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
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab !== "Dashboard" && (
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-64">
              <div className="text-center text-gray-500 text-4xl">
                {activeTab === "Problems" && <AlertCircle />}
                {activeTab === "Map View" && <MapPin />}
                {activeTab === "Analytics" && <BarChart2 />}
                {activeTab === "Personnel" && <Users />}
                {activeTab === "Settings" && <Settings />}
                <h2 className="text-xl font-semibold mt-2">{activeTab} View</h2>
                <p className="mt-2">This section is under development</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
