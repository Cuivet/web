import React , {useState}from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { StarOutlined, StarFilled} from "@ant-design/icons";
import { Star } from '@mui/icons-material';

const StarDisplay = ({ qualification, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => onChange(value)}
          onMouseOver={() => handleMouseOver(value)}
          onMouseLeave={handleMouseLeave}
        >
          {value <= (hoverRating || qualification) ? (
            // pasar todo el estilo a una claseeeeeee!
            <StarFilled style={{ fontSize: 20, color: 'rgba(88, 9, 114, 0.329)' }} />
          ) : (
            <StarOutlined StarFilled style={{ fontSize: 20, color: 'rgba(88, 9, 114, 0.329)' }} />
          )}
        </span>
      ))}
    </div>
  );

};

export default StarDisplay;