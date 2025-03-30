import { ArrowUpRight, Bell, Briefcase, CheckCircle, Clock, DollarSign, MessageSquare, PlusCircle, FileText, User } from "lucide-react"

function FreelancerDashboardOverview() {
  const stats = [
    {
      title: "Active Projects",
      value: "4",
      icon: Briefcase,
      change: "+2 this month",
      changeType: "positive",
    },
    {
      title: "Pending Proposals",
      value: "3",
      icon: FileText,
      change: "+1 this week",
      changeType: "positive",
    },
    {
      title: "Total Earnings",
      value: "$8,750",
      icon: DollarSign,
      change: "+$1,200 this month",
      changeType: "positive",
    },
    {
      title: "Completed Projects",
      value: "17",
      icon: CheckCircle,
      change: "+3 this quarter",
      changeType: "positive",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "Proposal accepted",
      description: "Your proposal for the E-commerce project was accepted",
      time: "30 minutes ago",
      type: "proposal",
    },
    {
      id: 2,
      title: "New project milestone",
      description: "New milestone added to Mobile App UI project",
      time: "3 hours ago",
      type: "project",
    },
    {
      id: 3,
      title: "Message from client",
      description: "John sent you a message about the website redesign",
      time: "Yesterday",
      type: "message",
    },
    {
      id: 4,
      title: "Payment received",
      description: "Payment of $1,200 for the SEO project has been received",
      time: "2 days ago",
      type: "payment",
    },
  ]

  const activeProjects = [
    {
      id: 1,
      name: "E-commerce Website Redesign",
      client: "TechSolutions Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 75,
      deadline: "May 15, 2025",
      budget: "$3,500",
    },
    {
      id: 2,
      name: "Mobile App UI Design",
      client: "HealthTrack",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 60,
      deadline: "June 2, 2025",
      budget: "$2,800",
    },
    {
      id: 3,
      name: "SEO Optimization",
      client: "SmallBiz Marketing",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 40,
      deadline: "May 30, 2025",
      budget: "$1,500",
    },
    {
      id: 4,
      name: "Content Writing for Blog",
      client: "DevInsights",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 25,
      deadline: "June 10, 2025",
      budget: "$800",
    },
  ]

  return (
    <div className="space-y-6 mt-0 mb-2 mr-2 ml-2">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-lg bg-white shadow-sm">
            <div className="flex flex-row items-center justify-between p-4 pb-2">
              <h3 className="text-sm font-medium">{stat.title}</h3>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="p-4 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive" ? "text-green-500" : "text-red-500"
                } flex items-center mt-1`}
              >
                {stat.change}
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                ) : (
                  <ArrowUpRight className="ml-1 h-3 w-3 rotate-180" />
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="col-span-1 rounded-lg bg-white shadow-sm">
          <div className="p-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Active Projects
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center justify-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Find New Projects
              </button>
              {activeProjects.map((project) => (
                <div key={project.id} className="flex flex-col space-y-2 rounded-lg shadow-sm p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{project.name}</div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full border">${project.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full">
                      <img
                        src={project.avatar || "/placeholder.svg"}
                        alt={project.client}
                        className="aspect-square h-full w-full"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='10' fill='%236b7280'%3E" +
                            project.client
                              .split(" ")
                              .map((n) => n[0])
                              .join("") +
                            "%3C/text%3E%3C/svg%3E"
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{project.client}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Deadline: {project.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 rounded-lg bg-white shadow-sm">
          <div className="p-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Recent Notifications
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex gap-3 rounded-lg shadow-sm p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    {notification.type === "proposal" && <FileText className="h-4 w-4 text-primary" />}
                    {notification.type === "project" && <CheckCircle className="h-4 w-4 text-primary" />}
                    {notification.type === "message" && <MessageSquare className="h-4 w-4 text-primary" />}
                    {notification.type === "payment" && <DollarSign className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-xs text-gray-500">{notification.description}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 px-4 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium">
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerDashboardOverview