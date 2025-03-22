import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const AnalyticsChart = ({ title, data, type }) => {
  // Common chart options
  const commonOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
          padding: 10,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "white",
        bodyColor: "white",
        padding: 10,
        cornerRadius: 4,
        displayColors: true,
      },
    },
  }

  // Specific options for different chart types
  const chartOptions = {
    bar: {
      ...commonOptions,
      scales: {
        x: {
          ticks: { color: "white" },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
        },
        y: {
          ticks: { color: "white" },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
        },
      },
    },
    line: {
      ...commonOptions,
      scales: {
        x: {
          ticks: { color: "white" },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
        },
        y: {
          ticks: { color: "white" },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
        },
      },
      elements: {
        line: {
          tension: 0.3, // Smoother line
        },
        point: {
          radius: 4,
          hoverRadius: 6,
        },
      },
    },
    pie: {
      ...commonOptions,
    },
    doughnut: {
      ...commonOptions,
      cutout: "70%",
    },
  }

  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case "bar":
        return <Bar data={data} options={chartOptions.bar} />
      case "line":
        return <Line data={data} options={chartOptions.line} />
      case "pie":
        return <Pie data={data} options={chartOptions.pie} />
      case "doughnut":
        return <Doughnut data={data} options={chartOptions.doughnut} />
      default:
        return <p className="text-white">Chart type not supported</p>
    }
  }

  return <div className="w-full h-full">{renderChart()}</div>
}

export default AnalyticsChart

