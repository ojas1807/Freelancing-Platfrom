import {
    Home,
    Briefcase,
    MessageSquare,
    CreditCard,
    Settings,
    Bell,
    LogOut,
    ArrowUpRight,
    Clock,
    DollarSign,
    CheckCircle,
  } from "lucide-react"
import { Link } from "react-router-dom"
  
  function Dashboard() {
    return (
      <div className="flex h-screen bg-base-100">
        {/* Sidebar */}
        <div className="w-64 bg-[#6E2CF4] text-white flex flex-col">
          {/* Logo */}
          <div className="p-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-[#6E2CF4] rounded-md flex items-center justify-center font-bold">
              FH
            </div>
            <span className="text-xl font-bold">FreelanceHub</span>
          </div>
  
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="flex items-center gap-3 p-3 bg-white/20 rounded-md">
                  <Home size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <a href="/signup" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md">
                  <Briefcase size={20} />
                  <span>Projects</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} />
                    <span>Messages</span>
                  </div>
                  <span className="bg-white text-[#6E2CF4] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    2
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md">
                  <CreditCard size={20} />
                  <span>Payments</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md">
                  <Settings size={20} />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
  
          {/* User Profile */}
          <div className="p-4 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-white/30"></div>
              </div>
              <div className="flex-1">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-white/70">john.doe@example.com</div>
              </div>
              <button className="btn btn-ghost btn-sm btn-circle">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="border-b p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <Bell />
                    <span className="badge badge-sm badge-error indicator-item">3</span>
                  </div>
                </div>
              </div>
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src="/placeholder.svg?height=40&width=40" alt="Profile" />
                </div>
              </div>
            </div>
          </header>
  
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div className="card bg-base-100 shadow-sm border">
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-base font-medium">Active Projects</h2>
                    <p className="text-3xl font-bold mt-2">4</p>
                    <p className="text-xs text-success mt-1 flex items-center">
                      +2 this month <ArrowUpRight size={12} className="ml-1" />
                    </p>
                  </div>
                  <div className="bg-base-200 p-2 rounded-md">
                    <Briefcase size={20} />
                  </div>
                </div>
              </div>
            </div>
  
            <div className="card bg-base-100 shadow-sm border">
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-base font-medium">Pending Proposals</h2>
                    <p className="text-3xl font-bold mt-2">7</p>
                    <p className="text-xs text-success mt-1 flex items-center">
                      +3 this week <ArrowUpRight size={12} className="ml-1" />
                    </p>
                  </div>
                  <div className="bg-base-200 p-2 rounded-md">
                    <Clock size={20} />
                  </div>
                </div>
              </div>
            </div>
  
            <div className="card bg-base-100 shadow-sm border">
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-base font-medium">Total Spent</h2>
                    <p className="text-3xl font-bold mt-2">₹12,450</p>
                    <p className="text-xs text-success mt-1 flex items-center">
                      +₹2,100 this month <ArrowUpRight size={12} className="ml-1" />
                    </p>
                  </div>
                  <div className="bg-base-200 p-2 rounded-md">
                    <DollarSign size={20} />
                  </div>
                </div>
              </div>
            </div>
  
            <div className="card bg-base-100 shadow-sm border">
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-base font-medium">Completed Projects</h2>
                    <p className="text-3xl font-bold mt-2">23</p>
                    <p className="text-xs text-success mt-1 flex items-center">
                      +5 this quarter <ArrowUpRight size={12} className="ml-1" />
                    </p>
                  </div>
                  <div className="bg-base-200 p-2 rounded-md">
                    <CheckCircle size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            {/* Active Projects Section */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2">
                    <Briefcase size={20} />
                    Active Projects
                  </h2>
  
                  <div className="space-y-4 mt-4">
                    {/* Project 1 */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">E-commerce Website Redesign</h3>
                        <span className="font-bold">3,500</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="avatar">
                          <div className="w-6 h-6 rounded-full bg-base-300"></div>
                        </div>
                        <span className="text-sm text-base-content/70">Sarah Johnson</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>75%</span>
                        </div>
                        <progress className="progress progress-primary w-full" value="75" max="100"></progress>
                      </div>
                      <div className="text-sm text-base-content/70 mt-2">Deadline: May 15, 2025</div>
                    </div>
  
                    {/* Project 2 */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Mobile App UI Design</h3>
                        <span className="font-bold">₹2,800</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="avatar">
                          <div className="w-6 h-6 rounded-full bg-base-300"></div>
                        </div>
                        <span className="text-sm text-base-content/70">Michael Chen</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>60%</span>
                        </div>
                        <progress className="progress progress-primary w-full" value="60" max="100"></progress>
                      </div>
                      <div className="text-sm text-base-content/70 mt-2">Deadline: June 2, 2025</div>
                    </div>
  
                    {/* Project 3 */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">SEO Optimization</h3>
                        <span className="font-bold">₹1,500</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="avatar">
                          <div className="w-6 h-6 rounded-full bg-base-300"></div>
                        </div>
                        <span className="text-sm text-base-content/70">Emily Rodriguez</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>30%</span>
                        </div>
                        <progress className="progress progress-primary w-full" value="30" max="100"></progress>
                      </div>
                      <div className="text-sm text-base-content/70 mt-2">Deadline: July 10, 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Notifications Section */}
            <div>
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2">
                    <Bell size={20} />
                    Recent Notifications
                  </h2>
  
                  <div className="space-y-4 mt-4">
                    {/* Notification 1 */}
                    <div className="flex gap-3">
                      <div className="bg-[#6E2CF4]/10 p-2 rounded-full h-fit">
                        <Briefcase size={18} className="text-[#6E2CF4]" />
                      </div>
                      <div>
                        <h3 className="font-medium">New proposal received</h3>
                        <p className="text-sm text-base-content/70">
                          John Smith submitted a proposal for your web design project
                        </p>
                        <p className="text-xs text-base-content/50 mt-1">10 minutes ago</p>
                      </div>
                    </div>
  
                    {/* Notification 2 */}
                    <div className="flex gap-3">
                      <div className="bg-[#6E2CF4]/10 p-2 rounded-full h-fit">
                        <CheckCircle size={18} className="text-[#6E2CF4]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Project milestone completed</h3>
                        <p className="text-sm text-base-content/70">
                          Mobile App UI Design project milestone has been completed
                        </p>
                        <p className="text-xs text-base-content/50 mt-1">2 hours ago</p>
                      </div>
                    </div>
  
                    {/* Notification 3 */}
                    <div className="flex gap-3">
                      <div className="bg-[#6E2CF4]/10 p-2 rounded-full h-fit">
                        <MessageSquare size={18} className="text-[#6E2CF4]" />
                      </div>
                      <div>
                        <h3 className="font-medium">New message from Sarah</h3>
                        <p className="text-sm text-base-content/70">
                          Sarah sent you a message about the logo design project
                        </p>
                        <p className="text-xs text-base-content/50 mt-1">Yesterday</p>
                      </div>
                    </div>
  
                    {/* Notification 4 */}
                    <div className="flex gap-3">
                      <div className="bg-[#6E2CF4]/10 p-2 rounded-full h-fit">
                        <DollarSign size={18} className="text-[#6E2CF4]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Payment processed</h3>
                        <p className="text-sm text-base-content/70">
                          Your payment of ₹750 for the SEO project has been processed
                        </p>
                        <p className="text-xs text-base-content/50 mt-1">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Dashboard
  
  