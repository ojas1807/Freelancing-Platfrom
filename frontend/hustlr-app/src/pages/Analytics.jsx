import AnalyticsChart from "../dashboards/AnalyticsChart"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const Analytics = () => {
  const charts = [
    {
      title: "Client Analytics",
      data: {
        labels: ["New Clients", "Returning Clients"],
        datasets: [
          {
            label: "Clients",
            data: [40, 60],
            backgroundColor: ["#422AD5", "#FF6384"],
          },
        ],
      },
      type: "pie",
    },
    {
      title: "Project Analytics",
      data: {
        labels: ["Active", "Completed", "Missed Deadlines"],
        datasets: [
          {
            label: "Projects",
            data: [10, 25, 5],
            backgroundColor: ["#422AD5", "#FFCE56", "#FF6384"],
          },
        ],
      },
      type: "bar",
    },
    {
      title: "Time Management",
      data: {
        labels: ["Productive Hours", "Idle Time"],
        datasets: [
          {
            label: "Hours Worked",
            data: [6, 2],
            backgroundColor: ["#422AD5", "#FF6384"],
          },
        ],
      },
      type: "doughnut",
    },
    {
      title: "Skill Growth",
      data: {
        labels: ["Skill Utilization", "New Skills", "Certifications"],
        datasets: [
          {
            label: "Skill Growth",
            data: [70, 20, 10],
            backgroundColor: ["#422AD5", "#4BC0C0", "#FFCE56"],
            borderColor: "#422AD5",
            fill: false,
          },
        ],
      },
      type: "line",
    },
  ]

  return (
    <div className="min-h-screen p-6 bg-[#422AD5] text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center">Analytics Dashboard</h1>

      {/* Info Cards - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {["Monthly Salary", "Time Tracking", "Client Relationship"].map((title, index) => (
          <Card
            key={index}
            className="bg-gradient-to-r from-[#422AD5] to-[#5B86E5] text-white border-none shadow-lg p-4 rounded-lg"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90">
                {title === "Monthly Salary" && "Earnings: $3,000 | 5 projects"}
                {title === "Time Tracking" && "80 hours: 75% productive, 25% idle"}
                {title === "Client Relationship" && "Top Client: Client A - $1,200 - 4.8/5"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Cards - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["Goal Setting", "Invoice & Payment", "Skills & Certifications"].map((title, index) => (
          <Card
            key={index}
            className="bg-gradient-to-r from-[#422AD5] to-[#5B86E5] text-white border-none shadow-lg p-4 rounded-lg"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90">
                {title === "Goal Setting" && "Goal: $5,000 in March – Progress: $3,200"}
                {title === "Invoice & Payment" && "Invoice #1234 - Web Design - $500 - Paid"}
                {title === "Skills & Certifications" && "Top: React.js, Web Dev, UX/UI Design"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts - Two Rows with Two Charts Each */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {charts.map(({ title, data, type }, index) => (
          <Card key={index} className="bg-white/10 border-none shadow-lg backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <AnalyticsChart title={title} data={data} type={type} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Analytics

