// ClientAnalyticsChart.jsx
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
    Filler,
  } from "chart.js";
  import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  
  const ClientAnalyticsChart = ({ title, data, type }) => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#9ca3af",
            font: {
              size: 12,
            },
            padding: 20,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(17, 24, 39, 0.9)",
          titleColor: "#e5e7eb",
          bodyColor: "#d1d5db",
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || "";
              const value = context.parsed.y || context.raw;
              if (type === 'pie' || type === 'doughnut') {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: $${value} (${percentage}%)`;
              }
              return `${label}: $${value}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },
          ticks: {
            color: "#9ca3af",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },
          ticks: {
            color: "#9ca3af",
            callback: (value) => `$${value}`,
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2,
          fill: "start",
        },
        point: {
          radius: 4,
          hoverRadius: 6,
          backgroundColor: "white",
        },
        bar: {
          borderRadius: 6,
          borderSkipped: false,
        },
      },
    };
  
    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderWidth: 1.5,
      })),
    };
  
    const renderChart = () => {
      switch (type) {
        case "bar":
          return <Bar data={chartData} options={options} />;
        case "line":
          return <Line data={chartData} options={options} />;
        case "pie":
          return <Pie data={chartData} options={options} />;
        case "doughnut":
          return <Doughnut data={chartData} options={{ ...options, cutout: "70%" }} />;
        default:
          return <div className="text-gray-400">Unsupported chart type</div>;
      }
    };
  
    return (
      <div className="w-full h-full flex items-center justify-center">
        {renderChart()}
      </div>
    );
  };
  
  export default ClientAnalyticsChart;