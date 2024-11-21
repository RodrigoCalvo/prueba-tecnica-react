import { CharacterVM } from "../models/characters";
import "./characters-list-item.css";

export const CharactersListItem = ({
  character,
}: {
  character: CharacterVM;
}) => {
  return (
    <li className="character-list-item">
      <a
        href={`/character/${character.id}`} //añadir routing
        className="character-list-item__link"
      >
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
      </a>
    </li>
  );
};
