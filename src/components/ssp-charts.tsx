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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTitlePlugin, Legend, Tooltip);

interface Props {
  labels: string[];
  dataPoints: number[];
  title: string;
  yLabel: string;
}

const surfriderBlue = "#64748B";
const surfriderRed = "#FF928A";
const lightGray = "#D3D3D3";
const chartFont =
  "'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', sans-serif";

export function BlueLineChart({ labels, dataPoints, title, yLabel }: Props) {
  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: surfriderBlue,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        color: surfriderBlue,
        font: { family: chartFont, size: 14 },
      },
      legend: {
        display: false, //hide chartjs elements
        labels: { color: lightGray },
      },
      tooltip: {
        titleColor: surfriderBlue,
        bodyColor: lightGray,
      },
    },
    scales: {
      x: {
        ticks: {
          color: lightGray,
          font: { family: chartFont, size: 16 },
        },
        grid: { color: lightGray, display: false },
      },
      y: {
        ticks: {
          color: lightGray,
          font: { family: chartFont, size: 12 },
        },
        title: {
          display: true,
          text: yLabel,
          color: lightGray,
          font: { family: chartFont, size: 14 },
          padding: { bottom: 20 },
        },
        grid: { color: lightGray },
      },
    },
  };

  return (
    <div className="w-full aspect-[16/9] mx-auto">
      <Line data={data} options={options} />
    </div>
  );
}

export function RedLineChart({ labels, dataPoints, title, yLabel }: Props) {
  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: surfriderRed,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        color: surfriderRed,
        font: { family: chartFont, size: 16 },
      },
      legend: {
        display: false, //  also hide here
        labels: { color: lightGray },
      },
      tooltip: {
        titleColor: surfriderRed,
        bodyColor: lightGray,
      },
    },
    scales: {
      x: {
        ticks: {
          color: lightGray,
          font: { family: chartFont, size: 12 },
        },
        grid: { color: lightGray, display: false },
      },
      y: {
        ticks: {
          color: lightGray,
          font: { family: chartFont, size: 12 },
        },
        title: {
          display: true,
          text: yLabel,
          color: lightGray,
          font: { family: chartFont, size: 14 },
          padding: { bottom: 20 },
        },
        grid: { color: lightGray },
      },
    },
  };

  return (
    <div className="w-full aspect-[16/9] mx-auto">
      <Line data={data} options={options} />
    </div>
  );
}
