import React, { useState, useEffect } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const StarSelector = ({ qualification, onChange }) => {
  const [currentRating, setCurrentRating] = useState(qualification || 0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setCurrentRating(qualification || 0);
  }, [qualification]);

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (value) => {
    setCurrentRating(value);
    onChange(value); // Notifica al componente padre el cambio de calificación
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          onMouseOver={() => handleMouseOver(value)}
          onMouseLeave={handleMouseLeave}
        >
          {value <= (hoverRating || currentRating) ? (
            <StarFilled
              style={{ fontSize: 20, color: "rgba(88, 9, 114, 0.329)" }}
            />
          ) : (
            <StarOutlined
              style={{ fontSize: 20, color: "rgba(88, 9, 114, 0.329)" }}
            />
          )}
        </span>
      ))}
    </div>
  );
};
export default StarSelector;
