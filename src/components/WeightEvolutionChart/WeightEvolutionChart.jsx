import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeightEvolutionChart = ({ data, title }) => {
  // Validar que data y data.datasets existan y sean arrays
  if (!data || !Array.isArray(data.datasets)) {
    return <div>Error: Datos inválidos</div>;
  }

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderColor: dataset.borderColor || 'rgba(153, 102, 255, 1)',
      backgroundColor: dataset.backgroundColor || 'rgba(153, 102, 255, 0.2)',
      fill: true,
      tension: 0.1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Mostrar la leyenda
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} kg`; // Mostrar el peso en kg en el tooltip
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        display: false, // Ocultar el eje Y
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value} kg`; // Mostrar el peso en kg en el eje Y
          },
        },
        grid: {
          display: false, // Ocultar las líneas de la cuadrícula del eje Y
        },
        suggestedMax: Math.max(...data.datasets.flatMap(dataset => dataset.data)) + 5, // Ajustar el máximo del eje Y
      },
    },
    elements: {
      point: {
        radius: 3, // Tamaño de los puntos
        hoverRadius: 5, // Tamaño de los puntos al pasar el cursor
        pointStyle: 'circle',
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        hoverBorderWidth: 2,
        hoverBackgroundColor: 'rgba(153, 102, 255, 0.8)',
      },
    },
  };

  return (
    <div>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>{title}</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeightEvolutionChart;







