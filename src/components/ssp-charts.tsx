"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title as ChartTitlePlugin,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";

// register all the pieces you need
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTitlePlugin, Legend, Tooltip);

interface Props {
  labels: string[];
  dataPoints: number[];
  title: string;
}

export function BlueLineChart({ labels, dataPoints, title }: Props) {
  const surfrider_blue = "#64748B";
  const lightGray = "#D3D3D3";

  // build your dataset
  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: surfrider_blue,
        tension: 0.3,
      },
    ],
  };

  // single, correct options block
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: surfrider_blue,
      },
      legend: {
        display: false, //hide chartjs elements
        labels: { color: lightGray },
      },
      tooltip: {
        titleColor: surfrider_blue,
        bodyColor: lightGray,
      },
    },
    scales: {
      x: {
        ticks: {
          color: lightGray,
          font: { family: "Family/caption", size: 12 },
        },
        grid: { color: lightGray, display: false },
      },
      y: {
        ticks: {
          color: lightGray,
          font: { family: "Family/caption", size: 12 },
        },
        grid: { color: lightGray },
      },
    },
  };

  return <Line data={data} options={options} width={500} height={280} />;
}

export function RedLineChart({ labels, dataPoints, title }: Props) {
  const surfrider_red = "#FF928A";
  const lightGray = "#D3D3D3";

  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: surfrider_red,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: surfrider_red,
      },
      legend: {
        display: false, //  also hide here
        labels: { color: lightGray },
      },
      tooltip: {
        titleColor: surfrider_red,
        bodyColor: lightGray,
      },
    },
    scales: {
      x: {
        ticks: {
          color: lightGray,
          font: { family: "Plus Jakarta Sans", size: 12 },
        },
        grid: { color: lightGray, display: false },
      },
      y: {
        ticks: {
          color: lightGray,
          font: { family: "Plus Jakarta Sans", size: 12 },
        },
        grid: { color: lightGray },
      },
    },
  };

  return <Line data={data} options={options} width={500} height={280} />;
}
