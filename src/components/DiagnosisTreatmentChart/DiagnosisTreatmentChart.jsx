import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { findAllByVeterinaryId } from "../../services/clinical_record.service";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const DiagnosisTreatmentChart = ({ veterinaryId, filters }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("Top 5 diagnósticos más frecuentes");

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      try {
        console.log("Fetching clinical records for veterinaryId:", veterinaryId);

        // Llamada al servicio para obtener todas las historias clínicas del veterinario
        const clinicalRecords = await findAllByVeterinaryId(veterinaryId);
        console.log("Clinical Records:", clinicalRecords);

        let filteredRecords = clinicalRecords;

        // Aplicar filtros: especie, mascota, y fechas
        const { fromDate, toDate, pet } = filters || {};

        // Actualizar título dinámico según los filtros de fecha
        let dynamicTitle = "Top 5 diagnósticos más frecuentes";
        const currentYear = new Date().getFullYear();

        if (fromDate && toDate) {
          const fromDateString = fromDate.format("DD/MM/YYYY");
          const toDateString = toDate.format("DD/MM/YYYY");
          dynamicTitle = `Top 5 diagnósticos más frecuentes desde ${fromDateString} hasta ${toDateString}`;
        } else if (fromDate) {
          const fromDateString = fromDate.format("DD/MM/YYYY");
          dynamicTitle = `Top 5 diagnósticos más frecuentes desde ${fromDateString} hasta hoy`;
        } else {
          dynamicTitle = `Top 5 diagnósticos más frecuentes en ${currentYear}`;
        }

        setTitle(dynamicTitle);

        // Filtrar por fecha
        if (fromDate && toDate) {
          filteredRecords = filteredRecords.filter(record => {
            const recordDate = new Date(record.createdAt); // Asumimos que "createdAt" es la fecha de la historia clínica
            return recordDate >= fromDate.toDate() && recordDate <= toDate.toDate();
          });
        }

        // Filtrar por mascota
        if (pet && pet.length > 0) {
          filteredRecords = filteredRecords.filter(record => {
            // Si el filtro de mascota es un array de IDs de mascotas, compararlos
            return pet.some(petName => record.pet.name === petName);
          });
          console.log("Filtrando por mascota(s):", pet, filteredRecords);
        }

        // Procesar las historias clínicas filtradas
        const diagnosisMap = {};

        filteredRecords.forEach((record) => {
          const diagnosisItems = record.diagnosis?.diagnosisItems || [];
          diagnosisItems.forEach(item => {
            const diagnosisResult = item.diagnosisResult;

            if (!diagnosisResult) return;

            if (!diagnosisMap[diagnosisResult]) {
              diagnosisMap[diagnosisResult] = 0;
            }
            diagnosisMap[diagnosisResult] += 1;
          });
        });

        console.log("Final diagnosisMap:", diagnosisMap);

        // Convertir el diccionario a un array y ordenar por frecuencia
        const diagnosisArray = Object.entries(diagnosisMap).map(([name, count]) => ({
          name,
          count,
        }));

        // Obtener el top 5 de diagnósticos más frecuentes
        const topDiagnoses = diagnosisArray.sort((a, b) => b.count - a.count).slice(0, 5);
        setData(topDiagnoses);
      } catch (error) {
        console.error("Error fetching clinical records:", error);
      }
    };

    if (veterinaryId) {
      fetchDiagnosisData();
    }
  }, [veterinaryId, filters]); // Dependemos de los filtros también

  // Preparar los datos para el gráfico
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Diagnósticos más frecuentes',
        data: data.map(item => item.count),
        backgroundColor: '#e9c4f2', // Color de fondo de las barras
        borderColor: '#e9c4f2', // Color del borde de las barras
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false, // No mostrar la leyenda
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`; // Mostrar la etiqueta con el valor
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'black',
        font: {
          weight: 'bold',
          size: 10,
        },
        formatter: (value) => value,
        clip: false,
        padding: {
          right: 5,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: Math.max(...data.map(item => item.count)) + 10, // Ajustar el máximo del eje x
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '300px' }}>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
        {title}
      </h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DiagnosisTreatmentChart;




