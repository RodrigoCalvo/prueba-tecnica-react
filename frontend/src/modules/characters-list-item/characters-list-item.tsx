import { useNavigate } from "react-router-dom";
import { CharacterVM } from "../../models/characters";
import "./characters-list-item.css";
import { useController } from "../../controller/useController";

export const CharactersListItem = ({
  character,
}: {
  character: CharacterVM;
}) => {
  const { setSelectedCharacter } = useController();
  const navigate = useNavigate();

  const handleItemClick = () => {
    setSelectedCharacter(character);
    navigate(`/character/${character.id}`);
  };

  return (
    <li className="character-list-item">
      <span onClick={handleItemClick} className="character-list-item__link">
        <figure className="character-list-item__thumbnail-container">
          <img
            className="character-list-item__thumbnail"
            src={character.image}
            alt=""
          />
        </figure>
        <div className="character-list-item__details">
          <span className="character-list-item__name">{character.name}</span>
          <span className="character-list-item__comics-count">
            {character.comics.count.total} cómics
          </span>
        </div>
      </span>
    </li>
  );
};
