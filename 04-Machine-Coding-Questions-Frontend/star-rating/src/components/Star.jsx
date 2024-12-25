import { useState } from "react";
import StarRating from "./StarRating";

const Star = () => {
  const [currentRating, setCurrentRating] = useState(3);

  function handleRatingChange(newRating) {
    setCurrentRating(newRating);
  }
  return (
    <div>
      <StarRating
        size={5}
        rating={currentRating}
        onChange={handleRatingChange}
      />
      <p>Current Rating : {currentRating}</p>
    </div>
  );
};

export default Star;
