import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { findAllByVeterinaryId } from "../../services/clinical_record.service";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

const LineChart = ({ veterinaryId, filters }) => {
  const [chartData, setChartData] = useState(null);
  const [maxVisits, setMaxVisits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { fromDate, toDate } = filters || {};
      const today = new Date();
      const currentYear = today.getFullYear();

      try {
        console.log("Fetching data for veterinaryId:", veterinaryId);
        const records = await findAllByVeterinaryId(veterinaryId);
        console.log("Clinical records:", records);

        const visitsByMonth = {};

        records.forEach((record) => {
          record.visits.forEach((visit) => {
            const visitDate = new Date(visit.createdAt);
            const visitYear = visitDate.getFullYear();
            const visitMonth = visitDate.getMonth() + 1; // Mes (1-12)

            // Filtrar por rango de fechas si están definidos
            if (fromDate && visitDate < fromDate.toDate()) return;
            if (toDate && visitDate > toDate.toDate()) return;

            if (visitYear === currentYear || (!fromDate && !toDate)) {
              const monthKey = `${visitYear}-${visitMonth}`;
              visitsByMonth[monthKey] = (visitsByMonth[monthKey] || 0) + 1;
            }
          });
        });

        console.log("Visits by month:", visitsByMonth);

        // Preparar datos para el gráfico
        const labels = Object.keys(visitsByMonth).map((monthKey) => {
          const [year, month] = monthKey.split('-');
          const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ];
          return `${monthNames[month - 1]} ${year}`;
        });

        const data = Object.values(visitsByMonth);

        if (data.length === 0) {
          setChartData(null); // No hay datos disponibles
        } else {
          setChartData({
            labels,
            datasets: [
              {
                label: 'Visitas por Mes',
                data: data,
                borderColor: '#5b2569',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
              },
            ],
          });
          setMaxVisits(Math.max(...data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(null);
      }
    };

    fetchData();
  }, [veterinaryId, filters]);

  const getTitle = () => {
    const { fromDate, toDate } = filters || {};
    const today = new Date();
    const currentYear = today.getFullYear();
    const formattedFromDate = fromDate ? fromDate.format('DD/MM/YYYY') : null;
    const formattedToDate = toDate ? toDate.format('DD/MM/YYYY') : null;

    if (!fromDate && !toDate) {
      return `Cantidad de visitas mensuales en ${currentYear}`;
    }
    if (fromDate && !toDate) {
      return `Cantidad de visitas mensuales desde ${formattedFromDate} hasta hoy`;
    }
    if (!fromDate && toDate) {
      return `Cantidad de visitas mensuales hasta ${formattedToDate}`;
    }
    if (fromDate && toDate) {
      return `Cantidad de visitas mensuales desde ${formattedFromDate} hasta ${formattedToDate}`;
    }
    return "Cantidad de visitas mensuales";
  };

  if (!chartData) {
    return <div style={{ textAlign: 'center', color: '#666', fontSize: '16px', marginTop: '20px' }}>No se encuentran datos disponibles para el filtro seleccionado.</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} visitas`;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#5b2569',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value) => value,
        padding: {
          top: 5,
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
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        suggestedMax: maxVisits + 5,
      },
    },
  };

  return (
    <div style={{ minHeight: '600px' }}>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>{getTitle()}</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;


















