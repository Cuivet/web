import React from 'react';
import { Card } from 'antd';

const VetVisitsKPI = ({ visits }) => {
  const currentYear = new Date().getFullYear(); // Obtener el año actual

  const cardStyle = {
    textAlign: 'center',
    fontSize: '18px', // Reducir el tamaño de la fuente general
    fontWeight: 'bold',
    backgroundColor: '#4B0082', // Violeta oscuro
    color: 'white', // Letras blancas
    width: '280px', // Ajustar el ancho del cuadro
    margin: '0 auto', // Centrar el cuadro
    borderRadius: '15px', // Bordes redondeados
  };

  const mascotaStyle = {
    fontSize: '16px', // Reducir el tamaño de la fuente de los nombres de las mascotas
    textAlign: 'left',
  };

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




