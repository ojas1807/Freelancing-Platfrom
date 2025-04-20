import {
  Home,
  Briefcase,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  ChartGantt,
  FileText,
  User
} from "lucide-react"
import { Link, Outlet, useLocation } from "react-router-dom"

// Main layout component that contains sidebar and header
function Freelancer_Dashboard_Layout() {
  const location = useLocation();
  
  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.endsWith(path);
  };
  
  return (
    <div className="flex h-screen bg-base-100" data-theme="light">
      {/* Sidebar */}
      <div className="w-64 text-black flex flex-col">
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/freelancer_dashboard" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/freelancer_dashboard') ? 'bg-[#6E2CF4] text-white' : 'hover:bg-white/10'}`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/freelancer_dashboard/proposals" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/proposals') ? 'bg-[#6E2CF4] text-white' : 'hover:bg-white/10'}`}
              >
                <FileText size={20} />
                <span>Proposals</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/freelancer_dashboard/projects" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/projects') ? 'bg-[#6E2CF4] text-white' : 'hover:bg-white/10'}`}
              >
                <Briefcase size={20} />
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/freelancer_dashboard/messages" 
                className={`flex items-center gap-3 p-3 rounded-md justify-between ${isActive('/messages') ? 'bg-[#6E2CF4] text-white' : 'hover:bg-white/10'}`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} />
                  <span>Messages</span>
                </div>
                <span className="bg-[#6E2CF4] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  2
                </span>
              </Link>
            </li>
            <li>
              <Link 
                to="/freelancer_dashboard/earnings" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/earnings') ? 'bg-[#6E2CF4] text-white' : 'hover:bg-white/10'}`}
              >
                <CreditCard size={20} />
                <span>Earnings</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/freelancer_dashboard/profile" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/profile') ? 'bg-[#6E2CF4] text-white' : 'hover:bg-white/10'}`}
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/freelancer_dashboard/settings" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/settings') ? 'bg-[#6E2CF4] text-white' : 'hover:bg-white/10'}`}
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/freelancer_dashboard/analytics" 
                className={`flex items-center gap-3 p-3 rounded-md ${isActive('/analytics') ? 'bg-[#6E2CF4] text-white' : 'hover:bg-white/10'}`}
              >
                <ChartGantt size={20} />
                <span>Analytics</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t bg-[#6E2CF4] border-white/20">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-white/30"></div>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white ">Jane Smith</div>
              <div className="text-xs text-white/70">jane.smith@example.com</div>
            </div>
            <button className="btn btn-ghost bg-white btn-sm btn-circle">
              <LogOut className="text-white"size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="p-4 flex justify-between items-center">
          {/* Header content can be added here if needed */}
        </header>

        {/* Page content will be rendered here */}
        <Outlet />
      </div>
    </div>
  );
}

export default Freelancer_Dashboard_Layout;