import { SyntheticEvent, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterVM } from "../../models/characters";
import "./characters-list-item.css";
import { useController } from "../../controller/useController";

export const CharactersListItem = ({
  character,
}: {
  character: CharacterVM;
}) => {
  const { loginState, likeCharacter, unlikeCharacter, setSelectedCharacter } =
    useController();
  const navigate = useNavigate();

  const isLiked = useMemo(
    () =>
      !!loginState.user?.likedCharacters?.find(
        (char) => char.id === character.id
      ),
    [character, loginState]
  );

  const handleItemClick = useCallback(() => {
    setSelectedCharacter(character.id);
    navigate(`/character/${character.id}`);
  }, [character, navigate, setSelectedCharacter]);

  const handleLikeClick = (ev: SyntheticEvent) => {
    ev.stopPropagation();
    if (isLiked) {
      unlikeCharacter(loginState.user!.id, character.id);
    } else {
      likeCharacter(loginState.user!.id, character.id);
    }
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
            {character.comics.total} cómics
          </span>
        </div>
        <div className="character-list-item__favorite">
          <span
            role="button"
            onClick={handleLikeClick}
            className={`character-list-item__heart ${
              isLiked ? "favorite" : ""
            }`}
          >
            ♥
          </span>
        </div>
      </span>
    </li>
  );
};
