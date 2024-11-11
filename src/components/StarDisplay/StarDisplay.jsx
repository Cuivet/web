
import React, { useState } from 'react';
import { StarOutlined, StarFilled } from "@ant-design/icons";

const StarDisplay = ({ qualification, onChange, disabled }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (value) => {
    if (!disabled) {
      setHoverRating(value);  // Solo mostrar el hover si no está deshabilitado
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);  // Solo quitar el hover si no está deshabilitado
    }
  };

  const handleClick = (value) => {
    if (!disabled && onChange) {  // Solo ejecutar si no está deshabilitado y hay un onChange
      onChange(value);  // Solo se ejecuta si no está deshabilitado
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}  // Solo ejecutará onChange si no está deshabilitado
          onMouseOver={() => handleMouseOver(value)}
          onMouseLeave={handleMouseLeave}
        >
          {value <= (hoverRating || qualification) ? (
            <StarFilled style={{ fontSize: 20, color: 'rgba(88, 9, 114, 0.329)' }} />
          ) : (
            <StarOutlined style={{ fontSize: 20, color: 'rgba(88, 9, 114, 0.329)' }} />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarDisplay;
