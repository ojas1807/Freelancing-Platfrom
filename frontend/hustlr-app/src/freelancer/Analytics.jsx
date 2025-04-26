// FreelancerAnalytics.jsx
import { motion } from "framer-motion";
import FreelancerAnalyticsChart from "../dashboards/AnalyticsChart";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const FreelancerAnalytics = () => {
  const charts = [
    {
      title: "Earnings Breakdown",
      description: "Income by project type",
      data: {
        labels: ["Web Dev", "Mobile", "Design", "Consulting", "Other"],
        datasets: [
          {
            label: "Earnings ($)",
            data: [6500, 3200, 2800, 1500, 800],
            backgroundColor: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
            borderColor: ["#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#f472b6"],
          },
        ],
      },
      type: "pie",
    },
    {
      title: "Monthly Income",
      description: "Last 6 months earnings",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Income ($)",
            data: [4200, 4800, 5100, 5900, 6700, 7300],
            backgroundColor: "#6366f1",
            borderColor: "#818cf8",
          },
        ],
      },
      type: "bar",
    },
    {
      title: "Time Allocation",
      description: "How you spend your work hours",
      data: {
        labels: ["Client Work", "Learning", "Admin", "Networking"],
        datasets: [
          {
            label: "Hours",
            data: [120, 30, 20, 10],
            backgroundColor: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"],
            borderColor: ["#818cf8", "#a78bfa", "#c084fc", "#e879f9"],
          },
        ],
      },
      type: "doughnut",
    },
    {
      title: "Client Ratings",
      description: "Your performance over time",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Average Rating",
            data: [4.2, 4.3, 4.5, 4.6, 4.7, 4.8],
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
      title: "Monthly Earnings",
      value: "$7,300",
      change: "+12%",
      icon: "💰",
      description: "From 5 projects",
    },
    {
      title: "Active Projects",
      value: "4",
      change: "+1",
      icon: "📌",
      description: "2 nearing deadline",
    },
    {
      title: "Client Rating",
      value: "4.8/5",
      change: "+0.1",
      icon: "⭐",
      description: "From 18 reviews",
    },
    {
      title: "Hours Worked",
      value: "145",
      change: "+15%",
      icon: "⏱️",
      description: "This month",
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
        <h1 className="text-3xl font-bold mb-2">Freelancer Dashboard</h1>
        <p className="text-gray-400">Track your performance and growth</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Find Work", icon: "🔍", color: "bg-indigo-600" },
          { label: "Track Time", icon: "⏱️", color: "bg-purple-600" },
          { label: "Send Invoice", icon: "🧾", color: "bg-pink-600" },
          { label: "Update Profile", icon: "🖊️", color: "bg-emerald-600" },
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
                <FreelancerAnalyticsChart 
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
                  client: "TechCorp (Web Development)", 
                  time: "2 hours ago",
                  status: "success"
                },
                { 
                  action: "Payment received", 
                  client: "$1,200 from DesignCo", 
                  time: "1 day ago",
                  status: "success"
                },
                { 
                  action: "New project offer", 
                  client: "Mobile App from StartupX", 
                  time: "2 days ago",
                  status: "info"
                },
                { 
                  action: "Client review", 
                  client: "⭐ ⭐ ⭐ ⭐ ⭐ from MarketingPro", 
                  time: "3 days ago",
                  status: "success"
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-gray-700 last:border-0">
                  <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${
                    item.status === 'success' ? 'bg-green-500' :
                    item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-gray-400">{item.client}</p>
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

export default FreelancerAnalytics;