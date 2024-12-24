import { useState } from "react";

const StarRating = ({ rating, onChange = () => {}, size = 5 }) => {
  const [hoveredRating, serHoveredRating] = useState(0);

  function handleStarHover(hoveredRating) {
    serHoveredRating(hoveredRating);
  }
  return (
    <div className="star-rating">
      {Array(size)
        .fill("")
        .map((_, index) => {
          const starValue = index + 1;
          let starClass = "star";

          if (hoveredRating >= starValue) {
            starClass += " hover";
          } else if (rating >= starValue) {
            starClass += " active";
          }
          return (
            <span
              className={starClass}
              key={index}
              onClick={() => onChange(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              onMouseLeave={() => handleStarHover(0)}
            >
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default StarRating;
