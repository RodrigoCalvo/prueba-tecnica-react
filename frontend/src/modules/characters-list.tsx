import { useController } from "../controller/useController";
import { CharactersListItem } from "./characters-list-item";
import "./characters-list.css";

export const CharactersList = () => {
  const { charactersList } = useController();

  return (
    <ol className="characters-list">
      {charactersList?.data?.map((character) => (
        <CharactersListItem key={character.id} character={character} />
      ))}
    </ol>
  );
};
