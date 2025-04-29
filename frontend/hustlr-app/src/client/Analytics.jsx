// ClientAnalytics.jsx
import { motion } from "framer-motion";
import ClientAnalyticsChart from "./ClientAnalyticsChart";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const ClientAnalytics = () => {
  const charts = [
    {
      title: "Freelancer Performance",
      description: "Quality ratings of your freelancers",
      data: {
        labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
        datasets: [
          {
            label: "Reviews",
            data: [65, 25, 5, 3, 2],
            backgroundColor: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
            borderColor: ["#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#f472b6"],
          },
        ],
      },
      type: "pie",
    },
    {
      title: "Project Budgets",
      description: "Budget allocation across projects",
      data: {
        labels: ["Web Dev", "Mobile App", "Marketing", "Design", "Other"],
        datasets: [
          {
            label: "Budget ($)",
            data: [12000, 8000, 5000, 3500, 2000],
            backgroundColor: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
            borderColor: ["#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#f472b6"],
          },
        ],
      },
      type: "bar",
    },
    {
      title: "Project Timeline",
      description: "Completion rate vs deadlines",
      data: {
        labels: ["On Time", "Slightly Late", "Very Late", "Not Completed"],
        datasets: [
          {
            label: "Projects",
            data: [15, 5, 2, 1],
            backgroundColor: ["#6366f1", "#8b5cf6", "#a855f7", "#ec4899"],
            borderColor: ["#818cf8", "#a78bfa", "#c084fc", "#f472b6"],
          },
        ],
      },
      type: "doughnut",
    },
    {
      title: "Spending Trend",
      description: "Monthly project spending",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Amount (₹)",
            data: [4500, 5200, 4800, 6100, 7300, 6800],
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "#6366f1",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      type: "line",
    },
  ];

  const metrics = [
    {
      title: "Active Projects",
      value: "8",
      change: "+2",
      icon: "📌",
      description: "3 nearing completion",
    },
    {
      title: "Monthly Spend",
      value: "₹6,800",
      change: "+12%",
      icon: "💰",
      description: "Across 5 freelancers",
    },
    {
      title: "Avg. Rating",
      value: "4.6/5",
      change: "+0.1",
      icon: "⭐",
      description: "From 42 reviews",
    },
    {
      title: "Freelancers Hired",
      value: "14",
      change: "+3",
      icon: "👥",
      description: "5 long-term",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Client Dashboard</h1>
        <p className="text-gray-400">Manage your projects and freelancers</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "New Project", icon: "➕", color: "bg-[#6E2CF4]" },
          { label: "Hire Freelancer", icon: "🔍", color: "bg-[#6E2CF4]" },
          { label: "Review Work", icon: "📝", color: "bg-[#6E2CF4]" },
          { label: "Make Payment", icon: "💳", color: "bg-[#6E2CF4]" },
        ].map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={`${action.color} p-4 rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all`}
          >
            <span className="text-2xl mb-2">{action.icon}</span>
            <span className="font-medium">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-indigo-500 transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-gray-300">
                    {metric.title}
                  </CardTitle>
                  <span className="text-2xl">{metric.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-gray-400">{metric.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    metric.change.startsWith('+') 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-indigo-500 transition-all h-full">
              <CardHeader>
                <CardTitle className="text-lg">{chart.title}</CardTitle>
                <p className="text-sm text-gray-400">{chart.description}</p>
              </CardHeader>
              <CardContent className="h-64">
                <ClientAnalyticsChart 
                  title={chart.title} 
                  data={chart.data} 
                  type={chart.type} 
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  action: "Project completed", 
                  freelancer: "Sarah Johnson (Web Dev)", 
                  time: "2 hours ago",
                  status: "success"
                },
                { 
                  action: "Payment processed", 
                  freelancer: "Michael Chen (Mobile App)", 
                  time: "1 day ago",
                  status: "success"
                },
                { 
                  action: "Deadline reminder", 
                  freelancer: "Design Project", 
                  time: "2 days ago",
                  status: "warning"
                },
                { 
                  action: "New freelancer hired", 
                  freelancer: "David Rodriguez (Marketing)", 
                  time: "3 days ago",
                  status: "info"
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-gray-700 last:border-0">
                  <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${
                    item.status === 'success' ? 'bg-green-500' :
                    item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-gray-400">{item.freelancer}</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ClientAnalytics;