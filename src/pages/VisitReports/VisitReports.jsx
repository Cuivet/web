import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
    width: {
      percent: "10%",
    }
  },
};

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Visitas registradas",
      data: [60, 73, 89, 77, 60, 65, 51, 46, 84, 76, 95, 80],
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
        label: "Mascotas atendidas",
        data: [28, 42, 55, 44, 45, 43, 41, 50, 68, 58, 81, 72],
        backgroundColor: "rgba(91, 37, 105, 0.8)",
    },
    {
      label: "Cirugías realizadas",
      data: [17, 8, 20, 13, 9, 5, 13, 26, 14, 25, 23, 10],
      backgroundColor: "rgba(75, 192, 192, 0.8)",
    },
    
  ],
};

export default function Reports() {
  return <Bar height="200px" width="200px" options={{ maintainAspectRatio: false }} data={data} />;
}
