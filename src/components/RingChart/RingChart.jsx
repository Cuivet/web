import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getAllByVeterinaryId } from "../../services/pet_association.service";
import { raceService } from '../../services/race.service';
import { specieService } from '../../services/specie.service';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const RingChart = ({ veterinaryId, filters }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Porcentaje de mascotas asociadas");
  const [noDataMessage, setNoDataMessage] = useState(""); // Nuevo estado para manejar el mensaje

  const fetchData = async () => {
    try {
      setLoading(true);
      setNoDataMessage(""); // Resetear el mensaje de error al cargar nuevos datos

      const { fromDate, toDate, pet, specie } = filters || {};

      // Obtener las asociaciones de mascotas asociadas al veterinaryId
      const petAssociations = await getAllByVeterinaryId(veterinaryId);
      let filteredAssociations = petAssociations;

      // Actualizar título dinámico según los filtros de fecha
      let dynamicTitle = "Porcentaje de mascotas asociadas";
      const currentYear = new Date().getFullYear();

      if (fromDate && toDate) {
        const fromDateString = fromDate.format("DD/MM/YYYY");
        const toDateString = toDate.format("DD/MM/YYYY");
        dynamicTitle = `Porcentaje de mascotas asociadas desde ${fromDateString} hasta ${toDateString}`;
      } else if (fromDate) {
        const fromDateString = fromDate.format("DD/MM/YYYY");
        dynamicTitle = `Porcentaje de mascotas asociadas desde ${fromDateString} hasta hoy`;
      } else if (toDate) {
        const toDateString = toDate.format("DD/MM/YYYY");
        dynamicTitle = `Porcentaje de mascotas asociadas desde la fecha de inicio hasta ${toDateString}`;
      } else {
        dynamicTitle = `Porcentaje de mascotas asociadas en ${currentYear}`;
      }
      setTitle(dynamicTitle);

      // Aplicar filtros por fecha
      if (fromDate && toDate) {
        filteredAssociations = filteredAssociations.filter(association => {
          const associationDate = new Date(association.associationDate);
          return associationDate >= fromDate.toDate() && associationDate <= toDate.toDate();
        });
      } else if (fromDate) {
        filteredAssociations = filteredAssociations.filter(association => {
          const associationDate = new Date(association.associationDate);
          return associationDate >= fromDate.toDate();
        });
      } else if (toDate) {
        filteredAssociations = filteredAssociations.filter(association => {
          const associationDate = new Date(association.associationDate);
          return associationDate <= toDate.toDate();
        });
      }


      // Filtrar por nombre de mascota
      if (pet && pet.length > 0) {
        filteredAssociations = filteredAssociations.filter(association => pet.includes(association.pet.name));
      }

      // Paso 1: Obtener los raceIds
      const raceIds = filteredAssociations.map(association => association.pet.raceId);

      // Paso 2: Obtener los specieIds
      const speciesDataPromises = raceIds.map(raceId => raceService.findByRaceId(raceId));
      const speciesDataResults = await Promise.all(speciesDataPromises);

      const specieIdsFromAssociations = speciesDataResults
        .map((speciesData, index) => {
          const species = speciesData.find(species => species.id === raceIds[index]);
          return species ? species.specieId : null;
        })
        .filter(specieId => specieId !== null);

      let filteredSpecieIds = specieIdsFromAssociations;

      // Filtrar por especie seleccionada
      if (specie && specie.length > 0) {
        filteredSpecieIds = specieIdsFromAssociations.filter(specieId => specie.includes(specieId));
      }

      // Manejo de mensaje de datos faltantes
      if (filteredSpecieIds.length === 0) {
        setNoDataMessage("No encontramos especies para el filtro seleccionado");
        setData(null); // Asegurarse de que no haya datos en el gráfico
        return; // Salir de la función
      }

      const speciesList = await specieService.findAll();
      const speciesNames = filteredSpecieIds.map(specieId => {
        const specie = speciesList.find(specie => specie.id === specieId);
        return specie ? specie.name : null;
      }).filter(name => name !== null);

      const speciesCount = {};
      speciesNames.forEach(specieName => {
        if (!speciesCount[specieName]) {
          speciesCount[specieName] = 0;
        }
        speciesCount[specieName]++;
      });

      const totalSpecies = speciesNames.length;
      const speciesPercentage = Object.keys(speciesCount).map(specieName => ({
        name: specieName,
        percentage: ((speciesCount[specieName] / totalSpecies) * 100).toFixed(2),
      }));

      const labels = speciesPercentage.map(specie => specie.name);
      const values = speciesPercentage.map(specie => specie.percentage);

      const chartData = {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              '#b68dca', '#e9c4f2', '#9253ab', '#ffb6c1','#f4a0c2', '#7fc3d4', '#40e0d0', '#afeeee','#a8d8e7',
            ],
            borderColor: [
              '#b68dca', '#e9c4f2', '#9253ab', '#ffb6c1', '#f4a0c2', '#7fc3d4', '#40e0d0', '#afeeee','#a8d8e7',
            ],
            borderWidth: 1,
          },
        ],
      };

      setData(chartData);
    } catch (error) {
      console.error("Error al obtener datos para el gráfico:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [veterinaryId, filters]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
      datalabels: {
        color: 'black',
        font: { weight: 'bold', size: 12 },
        formatter: (value, context) => {
          const name = context.chart.data.labels[context.dataIndex];
          return `${name}\n${value}%`;
        },
      },
    },
  };

  return (
    <div style={{ width: '65%', height: '70%', marginLeft: '50px' }}>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
        {title}
      </h1>
      {loading ? (
        <p>Cargando...</p>
      ) : noDataMessage ? (
        <p style={{ color: 'black', textAlign: 'center' }}>{noDataMessage}</p>
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </div>
  );
};

export default RingChart;

