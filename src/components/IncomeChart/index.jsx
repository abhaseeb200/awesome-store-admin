// components/IncomeChart.js
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const IncomeChart = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Total Income",
        data: [
          3200, 3200, 4800, 4800, 3000, 3000, 1700, 1700, 3700, 3700, 6000,
          6000,
        ],
        fill: true,
        backgroundColor: "rgba(93, 135, 255, 0.1)",
        borderColor: "#5d87ff",
        tension: 0,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#888" },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "#eee",
        },
        ticks: {
          color: "#888",
          callback: (value) => `$${value / 1000}k`,
        },
        suggestedMin: 1000,
        suggestedMax: 6000,
      },
    },
  };

  return (
    <div
      style={{
        height: "405px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default IncomeChart;
