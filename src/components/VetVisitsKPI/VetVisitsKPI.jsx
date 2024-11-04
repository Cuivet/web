// VetVisitsKPI.jsx
import React from 'react';
import { Card } from 'antd';

const VetVisitsKPI = ({ visits = {} }) => {
  const currentYear = new Date().getFullYear();

  const cardStyle = {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#5b2569', // Fondo en el color especificado
    color: '#ffffff', // Texto en blanco
    width: '280px',
    margin: '0 auto',
    borderRadius: '15px',
    border: 'none', // Sin borde (puedes agregar un borde blanco si deseas)
  };

  const mascotaStyle = {
    fontSize: '16px',
    textAlign: 'left',
  };

  // Verificar si visits está vacío
  if (Object.keys(visits).length === 0) {
    return <Card style={cardStyle}>No tienes visitas registradas.</Card>;
  }

  return (
    <Card style={cardStyle}>
      <div>Visitas a la Veterinaria en {currentYear}</div>
      {Object.entries(visits).map(([mascota, count]) => (
        <div key={mascota} style={mascotaStyle}>
          {mascota}: {count}
        </div>
      ))}
    </Card>
  );
};

export default VetVisitsKPI;



