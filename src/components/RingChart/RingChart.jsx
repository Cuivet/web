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

  const fetchData = async () => {
    try {
      setLoading(true);

      const { fromDate, toDate, pet, specie } = filters || {};

      // Obtener las asociaciones de mascotas asociadas al veterinaryId
      const petAssociations = await getAllByVeterinaryId(veterinaryId);
      console.log("Datos obtenidos del endpoint:", petAssociations);

      let filteredAssociations = petAssociations;

      // Aplicar filtros por fecha si están definidos
      if (fromDate && toDate) {
        filteredAssociations = filteredAssociations.filter(association => {
          const associationDate = new Date(association.createdAt); // Compara con createdAt de la asociación
          console.log(`Comparando fechas: ${associationDate} con ${fromDate.toDate()} y ${toDate.toDate()}`);
          return associationDate >= fromDate.toDate() && associationDate <= toDate.toDate();
        });
      }

      // Filtrar por nombre de mascota
      if (pet && pet.length > 0) {
        filteredAssociations = filteredAssociations.filter(association => pet.includes(association.pet.name));
        console.log("Filtrando por mascota(s):", pet, filteredAssociations);
      }

      // Paso 1: Extraer los raceId de las mascotas filtradas
      const raceIds = filteredAssociations.map(association => association.pet.raceId);
      console.log("Race IDs extraídos:", raceIds);

      // Paso 2: Usar los raceIds para traer las especies
      const speciesDataPromises = raceIds.map(raceId => raceService.findByRaceId(raceId)); // Llamamos a findByRaceId para cada raceId
      const speciesDataResults = await Promise.all(speciesDataPromises); // Esperamos a que todas las respuestas lleguen
      console.log("Datos de especies obtenidos:", speciesDataResults);

      // Paso 3: Crear un array con los specieId correspondientes a cada raceId
      const specieIdsFromAssociations = speciesDataResults
        .map((speciesData, index) => {
          // Extraemos el specieId de la especie correspondiente a cada raza
          const species = speciesData.find(species => species.id === raceIds[index]);
          return species ? species.specieId : null;
        })
        .filter(specieId => specieId !== null); // Filtrar los nulls si es que hubo alguno

      console.log("Specie IDs de las asociaciones:", specieIdsFromAssociations);

      // Filtrar por especie (ID) usando los specieIds extraídos
      let filteredSpecieIds = specieIdsFromAssociations;

      if (specie && specie.length > 0) {
        // Filtrar los specieIds de las asociaciones para que solo queden los que coincidan con los seleccionados
        filteredSpecieIds = specieIdsFromAssociations.filter(specieId => specie.includes(specieId));
        console.log("Specie IDs después de aplicar el filtro de especie(s):", filteredSpecieIds);
      }

      // Si no hay specieIds después de aplicar el filtro, usamos todos los specieIds extraídos
      if (filteredSpecieIds.length === 0) {
        filteredSpecieIds = specieIdsFromAssociations;
      }

      console.log("Datos filtrados (por especie):", filteredSpecieIds);

      // Paso 4: Usar los specieIds filtrados para contar las especies y calcular el porcentaje
      const speciesList = await specieService.findAll(); // Obtener lista completa de especies
      const speciesNames = filteredSpecieIds.map(specieId => {
        const specie = speciesList.find(specie => specie.id === specieId);
        return specie ? specie.name : null;
      }).filter(name => name !== null); // Filtramos los nulls

      // Contar las especies filtradas
      const speciesCount = {};

      speciesNames.forEach(specieName => {
        if (!speciesCount[specieName]) {
          speciesCount[specieName] = 0;
        }
        speciesCount[specieName]++;
      });

      // Calcular el porcentaje de cada especie
      const totalSpecies = speciesNames.length;
      const speciesPercentage = Object.keys(speciesCount).map(specieName => {
        const count = speciesCount[specieName];
        return {
          name: specieName,
          percentage: ((count / totalSpecies) * 100).toFixed(2),
        };
      });

      // Preparamos los datos para el gráfico
      const labels = speciesPercentage.map(specie => specie.name); // Las claves serán los nombres de las especies
      const values = speciesPercentage.map(specie => specie.percentage); // Los valores serán los porcentajes

      const chartData = {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              '#5b2569', '#e9c4f2', '#ff69b4', '#ffb6c1', '#40e0d0', '#afeeee',
            ],
            borderColor: [
              '#5b2569', '#e9c4f2', '#ff69b4', '#ffb6c1', '#40e0d0', '#afeeee',
            ],
            borderWidth: 1,
          },
        ],
      };

      setData(chartData); // Establecer los datos para el gráfico
    } catch (error) {
      console.error("Error al obtener datos para el gráfico:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [veterinaryId, filters]); // Re-render cuando los filtros cambian

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Oculta la leyenda
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`; // Corregido
          },
        },
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value, context) => {
          const name = context.chart.data.labels[context.dataIndex];
          return `${name}s\n${value}%`; // Corregido
        },
      },
    },
  };

  return (
    <div style={{ width: '60%', height: '60%', marginLeft: '50px' }}>
      {loading ? <p>Cargando...</p> : <Doughnut data={data} options={options} />}
    </div>
  );
};

export default RingChart;
