import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { findAllByVeterinaryId } from "../../services/clinical_record.service";
import { raceService } from "../../services/race.service";
import { specieService } from "../../services/specie.service";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const DiagnosisTreatmentChart = ({ veterinaryId, filters }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("Top 5 diagnósticos más frecuentes");
  const [noDataMessage, setNoDataMessage] = useState(""); // Nuevo estado para manejar el mensaje
  const [races, setRaces] = useState([]);
  const [speciesIds, setSpecies] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      await raceService.findAll().then((response) => {
        setRaces(response);
      });
      await specieService.findAll().then((response) => {
        setSpecies(response);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {

    const fetchDiagnosisData = async () => {

      try {
        // console.log("Fetching clinical records for veterinaryId:", veterinaryId);

  
        // Llamada al servicio para obtener todas las historias clínicas del veterinario
        const clinicalRecords = await findAllByVeterinaryId(veterinaryId);
        // console.log("Clinical Records:", clinicalRecords);
  
        let filteredRecords = clinicalRecords;
  
        // Aplicar filtros: especie, mascota, y fechas
        const { fromDate, toDate, pet, specie } = filters || {};
  
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
        } else if (toDate) {
          const toDateString = toDate.format("DD/MM/YYYY");
          dynamicTitle = `Top 5 diagnósticos más frecuentes desde la fecha de incio hasta ${toDateString}`;
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
        } else if (fromDate) {
          filteredRecords = filteredRecords.filter(record => {
            const recordDate = new Date(record.createdAt);
            return recordDate >= fromDate.toDate();
          });
        } else if (toDate) {
          filteredRecords = filteredRecords.filter(record => {
            const recordDate = new Date(record.createdAt);
            return recordDate <= toDate.toDate();
          });
        }
  
        // Filtrar por mascota
        if (pet && pet.length > 0) {
          filteredRecords = filteredRecords.filter(record =>
            pet.some(petName => record.pet.name === petName)
          );
          // console.log("Filtrando por mascota(s):", pet, filteredRecords);
        }

        //filtrar por especie
        /*if (specie && specie.length > 0) { 
          console.log ('RAZAS', filteredRecords.pet.raceId)
          console.log ('Especie filtrada', specie)
           const specieId = speciesIds.find(
            (specie) =>
              specie.id ===
              races.find((race) => race.id === record.pet.raceId).specieId
          ).id

          
          filteredRecords = filteredRecords.filter(record => {
            const specieId = speciesIds.find(
              (specie) =>
                specie.id ===
                races.find((race) => race.id === record.pet.raceId).specieId
            ).id;
            
          } )

        }*/
              // Paso 1: Obtener los raceIds
      const raceIds = filteredRecords.map(record => record.pet.raceId);
      // console.log('Razas', raceIds)
      // Paso 2: Obtener los specieIds
      const speciesDataPromises = raceIds.map(raceId => raceService.findByRaceId(raceId));
      const speciesDataResults = await Promise.all(speciesDataPromises);
      // console.log('Todas las razas', speciesDataResults)

      const specieIdsFromAssociations = speciesDataResults
        .map((speciesData, index) => {
          const species = speciesData.find(species => species.id === raceIds[index]);
          return species ? species.specieId : null;
        })
        .filter(specieId => specieId !== null);
        // console.log('ESPECIE DE LA CLINCIAL RECORD', specieIdsFromAssociations)
        
      let filteredSpecieIds = specieIdsFromAssociations; 
      // Filtrar por especie seleccionada
      if (specie && specie.length > 0) {
        // console.log('Especie filtrada', specie);
        
        // Filtrar specieIdsFromAssociations manteniendo solo los IDs que estén en el array specie
        filteredSpecieIds = specieIdsFromAssociations.filter(specieId => specie.includes(specieId));
      
        // console.log('Especies coincidentes después de la comparación', filteredSpecieIds);
      
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
      

  
        // Manejar el caso donde no hay registros después de los filtros
        if (filteredRecords.length === 0) {
          setNoDataMessage("No existen diagnósticos para el filtro seleccionado");
          setData([]); // Asegurarse de que no haya datos en el gráfico
          return; // Salir de la función
        }
  
        // Procesar las historias clínicas filtradas
        const diagnosisMap = {};
  
        filteredRecords.forEach(record => {
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
  
        // console.log("Final diagnosisMap:", diagnosisMap);
  
        // Convertir el diccionario a un array y ordenar por frecuencia
        const diagnosisArray = Object.entries(diagnosisMap).map(([name, count]) => ({
          name,
          count,
        }));
  
        // Obtener el top 5 de diagnósticos más frecuentes
        const topDiagnoses = diagnosisArray.sort((a, b) => b.count - a.count).slice(0, 5);
  
        setNoDataMessage(""); // Resetear el mensaje de error si hay datos
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
        {noDataMessage ? (
          <p style={{ color: 'black', textAlign: 'center' }}>{noDataMessage}</p>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
  );
};
  
export default DiagnosisTreatmentChart;