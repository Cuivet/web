import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { clinicalRecordService } from "../../services/clinical_record.service";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const WeightEvolutionChart = ({ tutorId, petNames, fromDate, toDate }) => {
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const colors = ["#5b2569", "#e9c4f2", "#40e0d0", "#ff69b4", "#ffb6c1"];

  // Función para formatear fechas
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Generar título dinámico
  const generateTitle = () => {
    const currentYear = new Date().getFullYear();

    if (!fromDate && !toDate) {
      return `Peso evolutivo de Mis Mascotas (en KG) - Año ${currentYear}`;
    }

    const formattedStart = fromDate ? formatDate(fromDate) : "la fecha de registro en Cuivet";
    const formattedEnd = toDate ? formatDate(toDate) : "Hoy";

    return `Peso evolutivo de Mis Mascotas (en KG) - Desde ${formattedStart} hasta ${formattedEnd}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tutorId) {
          console.log("Tutor ID inválido o no proporcionado:", tutorId);
          setErrorMessage("Datos inválidos. Ingrese un DNI válido.");
          setChartData(null);
          return;
        }

        const records = await clinicalRecordService.findAllByTutorId(tutorId);
        console.log("Registros clínicos obtenidos:", records);

        // Aplicar filtros
        const filteredRecords = records.filter((record) => {
          const visitDate = new Date(record.createdAt);
          const startFilter = fromDate ? new Date(fromDate) : null;
          const endFilter = toDate ? new Date(toDate) : null;

          // Filtros de fecha
          if (startFilter && visitDate < startFilter) return false;
          if (endFilter && visitDate > endFilter) return false;

          // Filtro por nombre de mascota
          if (petNames?.length > 0 && !petNames.includes(record.pet?.name)) {
            return false;
          }

          return true;
        });

        if (filteredRecords.length === 0) {
          setErrorMessage("No hay datos para mostrar.");
          setChartData(null);
          return;
        }

        // Agrupar datos por mascota
        const petsData = {};
        filteredRecords.forEach((record) => {
          const petName = record.pet?.name || "Desconocido";
          const visitDate = record.createdAt.split("T")[0];
          const weight = record.physicalExam?.weight || null;

          if (!petsData[petName]) {
            petsData[petName] = { dates: [], weights: [] };
          }

          petsData[petName].dates.push(visitDate);
          petsData[petName].weights.push(weight);
        });

        // Obtener todas las fechas únicas y ordenarlas
        const allDates = Array.from(
          new Set(filteredRecords.map((record) => record.createdAt.split("T")[0]))
        ).sort((a, b) => new Date(a) - new Date(b));

        // Generar datasets para el gráfico
        const datasets = Object.entries(petsData).map(([petName, data], index) => {
          let lastWeight = null; // Inicializa como null en lugar de 0
          let startedRecording = false;

          return {
            label: petName,
            data: allDates.map((date) => {
              const dateIndex = data.dates.indexOf(date);

              if (dateIndex !== -1) {
                lastWeight = data.weights[dateIndex];
                startedRecording = true;
                return lastWeight; // Usa el peso actual
              } else if (startedRecording) {
                return lastWeight || null; // Usa el último peso conocido si existe
              }

              return null; // Sin datos aún
            }),
            fill: false,
            borderColor: colors[index % colors.length],
            tension: 0.1,
          };
        });

        // Configurar los datos del gráfico
        const data = {
          labels: allDates,
          datasets,
        };

        setChartData(data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setErrorMessage("Error al obtener los datos.");
        setChartData(null);
      }
    };

    fetchData();
  }, [tutorId, petNames, fromDate, toDate]);

  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        {generateTitle()}
      </h3>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : chartData ? (
        <div style={{ width: "100%", maxWidth: "1200px", height: "300px", margin: "0 auto" }}>
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  title: { display: true, text: "Peso (KG)" },
                },
                x: {
                  title: { display: true, text: "Fechas" },
                  ticks: {
                    maxTicksLimit: 25,
                    font: {
                      size: 10,
                    },
                    callback: function (value) {
                      return this.getLabelForValue(value);
                    },
                  },
                },
              },
              elements: {
                point: {
                  radius: 4,
                  hoverRadius: 6,
                  pointStyle: "circle",
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw} KG`,
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default WeightEvolutionChart;
