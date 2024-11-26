import { useController } from "../../controller/useController";
import { CharactersListItem } from "../characters-list-item/characters-list-item";
import "./characters-list.css";

export const CharactersList = () => {
  const { isLoading, charactersList } = useController();

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <ol className="characters-list">
          {charactersList?.data?.map((character) => (
            <CharactersListItem key={character.id} character={character} />
          ))}
        </ol>
      )}
    </>
  );
};
