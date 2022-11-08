import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Perros', 'Gatos', 'Aves'],
  datasets: [
    {
      label: 'Cantidad de mascotas asociadas por especie',
      data: [156, 139, 25],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

export default function PetsReports() {
  return <Pie data={data} height="200px" width="200px" options={{ maintainAspectRatio: false }} />;
}