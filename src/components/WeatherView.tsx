import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type WeatherViewProps = {
  type: "temperature" | "precipitation" | "moisture";
  data: number[];
  errorMargin: number[];
  currentTime: number;
};

const WeatherView = ({
  type,
  data,
  errorMargin,
  currentTime,
}: WeatherViewProps) => {
  const chartData = {
    labels: Array.from(
      { length: data.length },
      (_, i) => `${(currentTime + i) % 24}`
    ),
    datasets: [
      {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        data: data,
        borderColor: "rgb(255, 255, 255)",
        tension: 0.1,
      },
      {
        label: "Upper Error Margin",
        data: data.map((value, index) => value + errorMargin[index]),
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        tension: 0.1,
      },
      {
        label: "Lower Error Margin",
        data: data.map((value, index) => value - errorMargin[index]),
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        position: "top",
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "rgba(50, 50, 50, 0.8)",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x.toFixed(1);
            }
            if (context.datasetIndex === 0) {
              label += ` ± ${errorMargin[context.dataIndex]}`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="w-full mx-auto h-full flex-1">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default WeatherView;
