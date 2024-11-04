// Top5Chart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const Top5Chart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Diagnósticos',
        data: data.map(item => item.count),
        backgroundColor: '#e9c4f2', // Cambia el color de fondo de las barras
        borderColor: '#e9c4f2', // Cambia el color del borde de las barras
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'black',
        font: {
          weight: 'bold',
          size: 14, // Ajusta el tamaño de la fuente si es necesario
        },
        formatter: (value) => value,
        clip: false, // Asegúrate de que las etiquetas no se recorten
        padding: {
          right: 10, // Añade un poco de espacio a la derecha de la etiqueta
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: Math.max(...data.map(item => item.count)) + 20, // Ajusta el máximo del eje x para dar más espacio
        ticks: {
          display: false, // Oculta las etiquetas del eje x
        },
        grid: {
          display: false, // Opcional: Oculta las líneas de la cuadrícula del eje x
        },
      },
    },
    layout: {
      padding: {
        right: 20, // Añade un poco de espacio a la derecha del gráfico
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Top5Chart;














