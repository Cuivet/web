// RingChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const RingChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.percentage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Oculta la leyenda
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value, context) => {
          const name = context.chart.data.labels[context.dataIndex];
          return `${name}\n${value}%`; // Muestra el nombre y el porcentaje
        },
      },
    },
  };

  return (
    <div style={{ width: '60%', height: '60%', marginLeft: '50px' }}> {/* Ajusta el tamaño aquí */}
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default RingChart;












