// Analytics.jsx
import { motion } from "framer-motion";
import AnalyticsChart from "../dashboards/AnalyticsChart";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Analytics = () => {
  const charts = [
    {
      title: "Client Analytics",
      description: "Breakdown of new vs returning clients",
      data: {
        labels: ["New Clients", "Returning Clients"],
        datasets: [
          {
            label: "Clients",
            data: [40, 60],
            backgroundColor: ["#6366f1", "#ec4899"],
            borderColor: ["#818cf8", "#f472b6"],
          },
        ],
      },
      type: "pie",
    },
    {
      title: "Project Analytics",
      description: "Current project status overview",
      data: {
        labels: ["Active", "Completed", "Missed Deadlines"],
        datasets: [
          {
            label: "Projects",
            data: [10, 25, 5],
            backgroundColor: ["#6366f1", "#10b981", "#ec4899"],
            borderColor: ["#818cf8", "#34d399", "#f472b6"],
          },
        ],
      },
      type: "bar",
    },
    {
      title: "Time Management",
      description: "Productive vs idle hours",
      data: {
        labels: ["Productive Hours", "Idle Time"],
        datasets: [
          {
            label: "Hours Worked",
            data: [6, 2],
            backgroundColor: ["#6366f1", "#ec4899"],
            borderColor: ["#818cf8", "#f472b6"],
          },
        ],
      },
      type: "doughnut",
    },
    {
      title: "Skill Growth",
      description: "Progress in skill development",
      data: {
        labels: ["Skill Utilization", "New Skills", "Certifications"],
        datasets: [
          {
            label: "Skill Growth",
            data: [70, 20, 10],
            backgroundColor: ["#6366f1", "#10b981", "#f59e0b"],
            borderColor: ["#818cf8", "#34d399", "#fbbf24"],
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
      value: "$3,200",
      change: "+12%",
      icon: "💰",
      description: "5 completed projects",
    },
    {
      title: "Productivity",
      value: "82%",
      change: "+5%",
      icon: "⚡",
      description: "6.5 productive hours/day",
    },
    {
      title: "Client Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      icon: "😊",
      description: "From 15 reviews",
    },
    {
      title: "Active Projects",
      value: "4",
      change: "-1",
      icon: "📌",
      description: "2 nearing deadline",
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
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Track your freelance performance and growth</p>
      </motion.div>

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
                <AnalyticsChart 
                  title={chart.title} 
                  data={chart.data} 
                  type={chart.type} 
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;