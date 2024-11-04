// LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Asegúrate de importar el plugin

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels); // Registra el plugin

const LineChart = ({ data, title }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: '', // Elimina el texto de la leyenda
        data: data.values,
        borderColor: '#5b2569', // Cambia el color de la línea a #5b2569
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
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
            return `${context.raw}`; // Muestra solo el número
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#5b2569', // Cambia el color de las etiquetas
        font: {
          weight: 'bold',
          size: 12, // Ajusta el tamaño de la fuente si es necesario
        },
        formatter: (value) => value,
        padding: {
          top: 5, // Eleva los valores 5 píxeles por encima de la línea
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: false,
          maxRotation: 45, // Rotación máxima de las etiquetas
          minRotation: 45, // Rotación mínima de las etiquetas
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: false, // Oculta las etiquetas del eje Y
        },
        grid: {
          display: false, // Oculta las líneas de la cuadrícula del eje Y
        },
        suggestedMax: Math.max(...data.values) + 50, // Ajusta el máximo del eje Y para dar más espacio
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

export default LineChart;












