import React from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const StarSelector = ({ rating, onClick }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} onClick={() => onClick(value)}>
          {value <= rating ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}
        </span>
      ))}
    </div>
  );
};

export default StarSelector;