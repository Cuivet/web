import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { findAllByVeterinaryId } from "../../services/clinical_record.service";
import { raceService } from "../../services/race.service";
import { specieService } from "../../services/specie.service";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

const LineChart = ({ veterinaryId, filters }) => {
  const [chartData, setChartData] = useState(null);
  const [maxVisits, setMaxVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState("");
  const [races, setRaces] = useState([]);
  const [speciesIds, setSpecies] = useState([]);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      await raceService.findAll().then((response) => {
        setRaces(response);
      });
      await specieService.findAll().then((response) => {
        setSpecies(response);
      });
    };
    fetchSpeciesData();
  }, []);

  useEffect(() => {
    const fetchDataLineChart = async () => {
      const today = new Date();
      const currentYear = today.getFullYear();

      try {
        const { fromDate, toDate, pet, specie } = filters || {};
        const records = await findAllByVeterinaryId(veterinaryId);
        const visitsByMonth = {};

        let filteredRecords = records;

        // Filtrar por especie
              // Paso 1: Obtener los raceIds
              const raceIds = filteredRecords.map(record => record.pet.raceId);
        
              // Paso 2: Obtener los specieIds
              const speciesDataPromises = raceIds.map(raceId => raceService.findByRaceId(raceId));
              const speciesDataResults = await Promise.all(speciesDataPromises);
        
              const specieIdsFromAssociations = speciesDataResults
                .map((speciesData, index) => {
                  const species = speciesData.find(species => species.id === raceIds[index]);
                  return species ? species.specieId : null;
                })
                .filter(specieId => specieId !== null);
                console.log('Especies de las fichas:', specieIdsFromAssociations)
                
              let filteredSpecieIds = specieIdsFromAssociations; 
              // Filtrar por especie seleccionada
              if (specie && specie.length > 0) {
                console.log('Especie filtrada', specie);
                
                // Filtrar specieIdsFromAssociations manteniendo solo los IDs que estén en el array specie
                filteredSpecieIds = specieIdsFromAssociations.filter(specieId => specie.includes(specieId));
              
                console.log('Especies coincidentes después de la comparación', filteredSpecieIds);
              
                // Si no hay coincidencias, limpiar registros filtrados
                if (filteredSpecieIds.length === 0) {
                  filteredRecords = [];
                } else {
                  // Filtrar los registros originales para mantener solo aquellos cuyas especies coincidan
                  filteredRecords = filteredRecords.filter(record => {
                    const raceId = record.pet.raceId;
                    const specieId = speciesIds.find(
                      specie => specie.id === races.find(race => race.id === raceId)?.specieId
                    )?.id;
                    return filteredSpecieIds.includes(specieId);
                  });
                }
              }

        // Filtrar por fechas
        filteredRecords.forEach((record) => {
          record.visits.forEach((visit) => {
            const visitDate = new Date(visit.createdAt);
            const visitYear = visitDate.getFullYear();
            const visitMonth = visitDate.getMonth() + 1;

            if (fromDate && visitDate < fromDate.toDate()) return;
            if (toDate && visitDate > toDate.toDate()) return;

            if (pet && pet.length > 0 && !pet.includes(record.pet.name)) return;

            if (visitYear === currentYear || (!fromDate && !toDate)) {
              const monthKey = `${visitYear}-${visitMonth}`;
              visitsByMonth[monthKey] = (visitsByMonth[monthKey] || 0) + 1;
            }
          });
        });

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
          setChartData(null);
          setNoDataMessage("No se encuentran datos disponibles para el filtro seleccionado");
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
          setNoDataMessage("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(null);
        setNoDataMessage("Ocurrió un error al obtener los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataLineChart();
  }, [veterinaryId, filters, races, speciesIds]);

  const getTitle = () => {
    const { fromDate, toDate, pet } = filters || {};
    const today = new Date();
    const currentYear = today.getFullYear();
    const formattedFromDate = fromDate ? fromDate.format('DD/MM/YYYY') : null;
    const formattedToDate = toDate ? toDate.format('DD/MM/YYYY') : null;

    let title = "Cantidad de visitas mensuales";

    if (!fromDate && !toDate) {
      title += ` en ${currentYear}`;
    } else if (fromDate && !toDate) {
      title += ` desde ${formattedFromDate} hasta hoy`;
    } else if (!fromDate && toDate) {
      title += ` hasta ${formattedToDate}`;
    } else if (fromDate && toDate) {
      title += ` desde ${formattedFromDate} hasta ${formattedToDate}`;
    }

    return title;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', color: '#666', fontSize: '16px', marginTop: '20px' }}>Cargando...</div>;
  }

  return (
    <div style={{ minHeight: '600px' }}>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>{getTitle()}</h1>
      {noDataMessage ? (
        <p style={{ color: 'black', textAlign: 'center' }}>{noDataMessage}</p>
      ) : (
        <Line data={chartData} options={{
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
        }} />
      )}
    </div>
  );
};

export default LineChart;

