import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Asegúrate de tener este import

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

const WeightEvolutionChart = ({ data, title }) => {
  // Validar que data y data.datasets existan y sean arrays
  if (!data || !Array.isArray(data.datasets)) {
    return <div>Error: Datos inválidos</div>;
  }

  const colors = [
    '#5b2569', // Púrpura
    '#e9c4f2', // Rosa claro
    '#1abc9c', // Turquesa
    '#16b8a0', // Turquesa claro
    '#19b0a4', // Turquesa más claro
    '#ae5198', // Rosa suave
    '#d367a5', // Rosa brillante
    '#de7db2', // Rosa claro
    '#a8e6cf', // Verde claro
    '#d8e7c9', // Verde más claro
    '#b2f0e4', // Verde suave
    '#f2d5e4', // Rosa suave
    '#e1f5fe', // Turquesa muy claro
  ];

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      borderColor: colors[index % colors.length] || 'rgba(153, 102, 255, 1)',
      backgroundColor: colors[index % colors.length].replace('1)', '0.2)') || 'rgba(153, 102, 255, 0.2)',
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
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
          size: 12,
        },
        anchor: 'end', // Posiciona la etiqueta al final
        align: 'end',  // Alinea la etiqueta al final
        offset: 1,     // Mueve la etiqueta hacia arriba
        formatter: (value) => {
          return `${value} kg`; // Muestra solo el peso en kg
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
        suggestedMax: Math.max(...data.datasets.flatMap(dataset => dataset.data)) + 30, // Ajustar el máximo del eje Y
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










