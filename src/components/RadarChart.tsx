import React from "react";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = (props: { data: number[] }) => {
  const chartData = {
    labels: ["Societal", "Environmental", "RIO"],
    datasets: [
      {
        label: "Submodel Scores",
        data: props.data,
        backgroundColor: "rgba(11,125,140,0.2)",
        borderColor: "rgba(11,125,140,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    // maintainAspectRatio: false,
    scales: {
      r: {
        min: -1,
        max: 1,
        ticks: { stepSize: 0.25, showLabelBackdrop: true },
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
