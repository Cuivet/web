import React, { useState, useEffect } from "react";
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
            const vet = `${record.veterinaryData?.person?.name || "Desconocido"} ${record.veterinaryData?.person?.lastName || ""}`;
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
              if (!visitsCount[key].lastVisitDate || visitDate > new Date(visitsCount[key].lastVisitDate)) {
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
    color: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "360px",
    margin: "0 auto",
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
      return `Visitas a la Veterinaria en ${currentYear}`;
    }

    const formattedFromDate = fromDate ? formatDate(fromDate) : "la fecha de inicio";
    const formattedToDate = toDate ? formatDate(toDate) : "Hoy"; // Si no hay 'toDate', usar la fecha actual
    return `Visitas Veterinarias desde ${formattedFromDate} hasta ${formattedToDate}`;
  };

  
  return (
    <div className="vet-visits-kpi">
      <h3 style={{ textAlign: "center" }}>
        {getTitle()}
        <br />
      </h3>

      <div style={cardStyle}>
        {Object.keys(visits).length === 0 ? (
          <p>No tenes visitas registradas.</p>
        ) : (
          <ul style={listStyle}>
            {Object.entries(visits).map(
              ([key, { visits, vetName, petName, clinicName, lastVisitDate }]) => (
                <li key={key} style={listItemStyle}>
                  Clínica: <strong>{clinicName} </strong> <br />
                  Veterinario/a: <strong>{vetName}</strong>
                  <br />
                  Mascota: <strong>{petName}</strong> - Cantidad de visitas:{" "}
                  <strong>{visits}</strong>
                  <br />
                  Última visita: <strong>{lastVisitDate ? formatDate(lastVisitDate) : "No disponible"}</strong>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VetVisitsKPI;
