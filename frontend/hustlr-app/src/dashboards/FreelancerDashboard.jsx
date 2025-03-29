"use client"

import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Users,
  UserPlus,
  Briefcase,
  PlusCircle,
  BarChart2,
  SettingsIcon,
  Bell,
  Search,
  User,
  Calendar,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react"
import Clients from "../pages/Clients"
import Projects from "../pages/Projects"
import NewClients from "../pages/NewClients"
import NewProjects from "../pages/NewProjects"
import Analytics from "../pages/Analytics"
import Settings from "../pages/Settings"

const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState("clients")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  // Update greeting based on time of day
  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date()
      const hour = now.getHours()

      // Set greeting based on time of day
      let greetingText = ""
      if (hour < 12) greetingText = "Good Morning"
      else if (hour < 18) greetingText = "Good Afternoon"
      else greetingText = "Good Evening"
      setGreeting(greetingText)

      // Format time (12-hour with AM/PM)
      const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true }
      setCurrentTime(now.toLocaleTimeString([], timeOptions))

      // Format date (e.g., Monday, January 1)
      const dateOptions = { weekday: "long", month: "long", day: "numeric" }
      setCurrentDate(now.toLocaleDateString([], dateOptions))
    }

    updateTimeAndGreeting()
    const interval = setInterval(updateTimeAndGreeting, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // On mobile, close sidebar after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const menuItems = [
    { label: "Clients", value: "clients", icon: Users },
    { label: "New Clients", value: "new_clients", icon: UserPlus },
    { label: "Projects", value: "projects", icon: Briefcase },
    { label: "New Projects", value: "new_projects", icon: PlusCircle },
    { label: "Analytics", value: "analytics", icon: BarChart2 },
    { label: "Settings", value: "settings", icon: SettingsIcon },
  ]

  // Mock data for quick stats
  const quickStats = [
    { label: "Active Projects", value: "12", icon: Briefcase, color: "bg-blue-500" },
    { label: "Pending Tasks", value: "24", icon: Clock, color: "bg-amber-500" },
    { label: "Total Clients", value: "36", icon: Users, color: "bg-emerald-500" },
    { label: "Monthly Earnings", value: "$4,250", icon: DollarSign, color: "bg-violet-500" },
  ]

  // Mock data for upcoming deadlines
  const upcomingDeadlines = [
    { project: "Website Redesign", client: "Acme Corp", dueDate: "Mar 25, 2025", status: "In Progress" },
    { project: "Mobile App Development", client: "TechStart", dueDate: "Apr 2, 2025", status: "Planning" },
    { project: "Brand Identity", client: "GreenLife", dueDate: "Apr 10, 2025", status: "In Progress" },
  ]

  // Mock data for recent activities
  const recentActivities = [
    { action: "Invoice Paid", details: "Acme Corp - $1,200", time: "2 hours ago" },
    { action: "New Message", details: "From: John at TechStart", time: "4 hours ago" },
    { action: "Project Completed", details: "Logo Design for GreenLife", time: "Yesterday" },
    { action: "New Client", details: "BlueSky Solutions signed up", time: "2 days ago" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "clients":
        return <Clients />
      case "new_clients":
        return <NewClients />
      case "projects":
        return <Projects />
      case "new_projects":
        return <NewProjects />
      case "analytics":
        return <Analytics />
      case "settings":
        return <Settings />
      default:
        return null
    }
  }

  // Dashboard overview content
  const renderDashboardOverview = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#422AD5] to-indigo-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{greeting}, Ojas !</h2>
              <p className="text-blue-100">
                {currentDate} | {currentTime}
              </p>
              <p className="mt-2 text-blue-100">You have 3 tasks due today and 2 new messages.</p>
            </div>
            <div className="hidden md:block">
              <Calendar className="w-16 h-16 text-white/80" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 transition-transform hover:scale-105"
            >
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout for Deadlines and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h3>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between">
                    <p className="font-medium">{deadline.project}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        deadline.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {deadline.status}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <p>{deadline.client}</p>
                    <p>Due: {deadline.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 border-b border-gray-100 pb-3 last:border-0">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <FileText size={16} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        } fixed md:relative z-20 h-full transition-all duration-300 ease-in-out bg-gradient-to-b from-[#422AD5] to-indigo-900 text-white ${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        } overflow-hidden shadow-xl`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className={`text-xl font-bold ${!sidebarOpen && "md:hidden"}`}>{sidebarOpen ? "Hustlr." : ""}</h2>
          <button onClick={toggleSidebar} className="text-white md:hidden">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* User Profile Section */}
        <div className={`px-4 py-6 border-b border-blue-700 ${!sidebarOpen && "md:border-none md:py-4"}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h3 className="font-medium">Ojas Patrikar</h3>
                <p className="text-xs text-blue-200">Web Developer</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <ul className="space-y-1 mt-5 px-2">
          {menuItems.map(({ label, value, icon: Icon }) => (
            <li
              key={value}
              className={`rounded-md cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                activeTab === value ? "bg-white/20" : ""
              } ${!sidebarOpen && "md:flex md:justify-center"}`}
              onClick={() => handleTabChange(value)}
            >
              <div
                className={`flex items-center space-x-3 p-3 ${!sidebarOpen && "md:justify-center md:p-3 md:space-x-0"}`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{label}</span>}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${!sidebarOpen ? "md:ml-20" : "md:ml-0"} p-4 md:p-6`}>
        {/* Top Navigation Bar */}
        <div className="bg-white rounded-xl shadow-sm mb-6 p-3 flex justify-between items-center">
          {/* Left side - Toggle and Page Title */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
              <Menu size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 capitalize hidden sm:block">
              {activeTab.replace("_", " ")}
            </h1>
          </div>

          {/* Right side - Search and Actions */}
          <div className="flex items-center space-x-3">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] w-48 lg:w-64"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#422AD5]/10 flex items-center justify-center">
              <User size={16} className="text-[#422AD5]" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="pb-6">{activeTab === "dashboard" ? renderDashboardOverview() : renderContent()}</div>
      </main>
    </div>
  )
}

export default FreelancerDashboard

