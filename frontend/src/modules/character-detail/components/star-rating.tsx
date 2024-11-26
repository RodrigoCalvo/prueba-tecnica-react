export const StarRating = ({
  currentRating,
  handleStarClick,
}: {
  currentRating: number;
  handleStarClick: Function;
}) => {
  return (
    <div className="character-detail__stars">
      {[...Array(10)].map((_, index) => (
        <span
          key={index}
          className={`character-detail__star ${
            +index < currentRating ? "character-detail__star--selected" : ""
          }`}
          onClick={() => handleStarClick(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};
