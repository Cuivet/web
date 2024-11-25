import React, { useState, useEffect } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const StarSelector = ({ qualification, onChange, disabled }) => {
  const [currentRating, setCurrentRating] = useState(qualification || 0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setCurrentRating(qualification || 0);
  }, [qualification]);

  const handleMouseOver = (value) => {
    if (!disabled) setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (!disabled) setHoverRating(0);
  };

  const handleClick = (value) => {
    if (!disabled && onChange) {
      setCurrentRating(value);
      onChange(value);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}   // Solo activado si no está deshabilitado
          onMouseOver={() => handleMouseOver(value)}   // Solo activado si no está deshabilitado
          onMouseLeave={handleMouseLeave}    // Solo activado si no está deshabilitado
        >
          {value <= (hoverRating || currentRating) ? (
            <StarFilled style={{ fontSize: 20, color: "rgba(88, 9, 114, 0.329)" }} />
          ) : (
            <StarOutlined style={{ fontSize: 20, color: "rgba(88, 9, 114, 0.329)" }} />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarSelector;