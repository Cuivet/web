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
          '#5b2569',   // Púrpura fuerte
          '#e9c4f2',   // Púrpura claro
          '#ff69b4',   // Rosa fuerte
          '#ffb6c1',   // Rosa claro
          '#40e0d0',   // Turquesa fuerte
          '#afeeee',   // Turquesa claro
          // Agrega más colores si es necesario
        ],
        borderColor: [
          '#5b2569',
          '#e9c4f2',
          '#ff69b4',
          '#ffb6c1',
          '#40e0d0',
          '#afeeee',
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
            return `${context.label}: ${context.raw}%`; // Corregido
          },
        },
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value, context) => {
          const name = context.chart.data.labels[context.dataIndex];
          return `${name}\n${value}%`; // Corregido
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






















