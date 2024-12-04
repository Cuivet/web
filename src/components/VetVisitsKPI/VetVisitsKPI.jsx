import React, { useState, useEffect } from "react";
import { Card, List, Typography } from "antd";
import { findAllByTutorId } from "../../services/clinical_record.service";

// Función para formatear la fecha a dd/mm/yyyy
const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0"); // Asegura que el día tenga 2 dígitos
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Asegura que el mes tenga 2 dígitos
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const VetVisitsKPI = ({ tutorId, fromDate, toDate, petName }) => {
  const [visits, setVisits] = useState({});
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (tutorId) {
      fetchVetVisits();
    }
  }, [tutorId, fromDate, toDate, petName]);

  const fetchVetVisits = async () => {
    try {
      console.log("Fetching clinical records for tutor ID:", tutorId);
      const clinicalRecords = await findAllByTutorId(tutorId);
      console.log("Clinical records fetched:", clinicalRecords);

      if (!clinicalRecords || clinicalRecords.length === 0) {
        setVisits({});
        return;
      }

      const visitsCount = {};

      clinicalRecords.forEach((record) => {
        if (record.visits && record.visits.length > 0) {
          record.visits.forEach((visit) => {
            const visitDate = new Date(visit.createdAt);
            const year = visitDate.getFullYear();

            // Aplicar filtros
            if (fromDate && visitDate < new Date(fromDate)) return;
            if (toDate && visitDate > new Date(toDate)) return;

            // Soportar filtros de mascotas múltiples
            if (petName?.length > 0 && !petName.includes(record.pet?.name)) {
              return;
            }

            const pet = record.pet?.name || "Desconocida";
            const vet = `${
              record.veterinaryData?.person?.name || "Desconocido"
            } ${record.veterinaryData?.person?.lastName || ""}`;
            const clinic = record.vet?.name || "Desconocida";

            if (year === currentYear) {
              const key = `${clinic}-${vet}-${pet}`;

              if (!visitsCount[key]) {
                visitsCount[key] = {
                  visits: 0,
                  vetName: vet,
                  petName: pet,
                  clinicName: clinic,
                  lastVisitDate: null, // Inicializar el campo para la última visita
                };
              }

              visitsCount[key].visits++;
              // Actualizar la fecha de la última visita si es más reciente
              if (
                !visitsCount[key].lastVisitDate ||
                visitDate > new Date(visitsCount[key].lastVisitDate)
              ) {
                visitsCount[key].lastVisitDate = visitDate;
              }
            }
          });
        }
      });

      console.log("Grouped visits count:", visitsCount);

      setVisits(visitsCount);
    } catch (error) {
      console.error("Error fetching vet visits:", error);
      setVisits({});
    }
  };

  const cardStyle = {
    backgroundColor: "#5b2569",
    height: "300px",
    display: "flex",
    flexDirection: "column",
  };
  const listTextStyle = {
    color: "#fff",
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const listItemStyle = {
    marginBottom: "10px",
  };

  // Título condicional con formato de fecha dd/mm/yyyy
  const getTitle = () => {
    if (!fromDate && !toDate) {
      // Si no hay filtros de fecha, mostrar el título con el año actual
      return `Visitas a la Clínica Veterinaria en ${currentYear}`;
    }

    const formattedFromDate = fromDate
      ? formatDate(fromDate)
      : "la fecha de inicio";
    const formattedToDate = toDate ? formatDate(toDate) : "Hoy"; // Si no hay 'toDate', usar la fecha actual
    return `Visitas a la Clínica Veterinarias desde ${formattedFromDate} hasta ${formattedToDate}`;
  };

  return (
    // <div className="vet-visits-kpi">
    <div>
      <style>
        {`
      .scroll-container::-webkit-scrollbar {
        width: 5px;
      }

      .scroll-container::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      .scroll-container::-webkit-scrollbar-thumb {
        background: #E9C4F2; /* Ajusta el color según tu diseño */
        border-radius: 10px;
      }

      .scroll-container::-webkit-scrollbar-thumb:hover {
        background: #523c89; /* Ajusta el color según tu diseño */
      }
    `}
      </style>
      <h3 style={{ textAlign: "center" }}>
        {getTitle()}
        <br />
      </h3>

      <div style={cardStyle}>
        {Object.keys(visits).length === 0 ? (
          <p>No tenes visitas registradas.</p>
        ) : (
          <div
            style={{
              flex: 1,
              overflowY: "auto", // Permite scroll vertical
            }}
            className="scroll-container"
          >
            <List
              dataSource={Object.values(visits)}
              size="small"
              split
              renderItem={(item) => (
                <List.Item key={item.key} style={listTextStyle}>
                  Clínica:{" "}
                  <Typography.Text style={listTextStyle} strong>
                    {item.clinicName}
                  </Typography.Text>
                  <br></br>Veterinario/a:{" "}
                  <Typography.Text style={listTextStyle} strong>
                    {item.vetName}
                  </Typography.Text>
                  <br></br>Mascota:{" "}
                  <Typography.Text style={listTextStyle} strong>
                    {item.petName}
                  </Typography.Text>
                  <br></br>Última visita:{" "}
                  <Typography.Text style={listTextStyle} strong>
                    {item.lastVisitDate
                      ? formatDate(item.lastVisitDate)
                      : "No disponible"}
                  </Typography.Text>
                  <br></br>Cantidad de visitas:{" "}
                  <Typography.Text style={listTextStyle} strong>
                    {item.visits}
                  </Typography.Text>
                </List.Item>
              )}
            />
          </div>
          // {/* {Object.entries(visits).map(
          //   ([key, { visits, vetName, petName, clinicName, lastVisitDate }]) => (
          //     <li key={key} style={listItemStyle}>
          //       Clínica: <strong>{clinicName} </strong> <br />
          //       Veterinario/a: <strong>{vetName}</strong>
          //       <br />
          //       Mascota: <strong>{petName}</strong> - Cantidad de visitas:{" "}
          //       <strong>{visits}</strong>
          //       <br />
          //       Última visita: <strong>{lastVisitDate ? formatDate(lastVisitDate) : "No disponible"}</strong>
          //     </li>
          //   )
          // )} */}
        )}
      </div>
    </div>
  );
};

export default VetVisitsKPI;
