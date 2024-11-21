import { useController } from "../controller/useController";

export const CharactersList = () => {
  const { charactersList } = useController();

  return (
    <ul className="characters-list">
      {charactersList?.data?.map((character) => (
        <li className="characters-list__item" key={character.id}>
          {character.name} - {character.comics.count.total} comics
        </li>
      ))}
    </ul>
  );
};
