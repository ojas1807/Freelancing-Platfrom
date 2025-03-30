import { DollarSign, MessageSquare, CheckCircle, Briefcase, Bell, ArrowUpRight, Clock } from "lucide-react";

function DashboardHome() {
    return (
      <>
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
                  <p className="text-3xl font-bold mt-2">$12,450</p>
                  <p className="text-xs text-success mt-1 flex items-center">
                    +$2,100 this month <ArrowUpRight size={12} className="ml-1" />
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
                      <span className="font-bold">$3,500</span>
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
                      <span className="font-bold">$2,800</span>
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
                      <span className="font-bold">$1,500</span>
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
                        Your payment of $750 for the SEO project has been processed
                      </p>
                      <p className="text-xs text-base-content/50 mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

export default DashboardHome;