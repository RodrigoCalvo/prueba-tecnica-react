import { useController } from "../../controller/useController";
import "./character-detail.css";

export const CharacterDetail = () => {
  const { selectedCharacter } = useController();

  return (
    <>
      {selectedCharacter ? (
        <div className="character-detail">
          <header className="character-detail__header">
            <picture className="character-detail__image-container">
              <img
                className="character-detail__image"
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
              />
            </picture>
            <h2 className="character-detail__name">{selectedCharacter.name}</h2>
          </header>
          <section className="character-detail__info">
            <h3 className="character-detail__subtitle">Descripción:</h3>
            <p className="character-detail__description">
              {selectedCharacter.description ??
                "No existe descripción de este personaje"}
            </p>
            <h3 className="character-detail__list-title">Listado de cómics:</h3>
            <ul className="character-detail__comics-list">
              {selectedCharacter.comics.count &&
                selectedCharacter.comics.titles.map((comicTitle, index) => (
                  <li
                    key={`${comicTitle}-${index}`}
                    className="character-detail__comic-item"
                  >
                    {comicTitle}
                  </li>
                ))}
            </ul>
          </section>
        </div>
      ) : (
        <p className="character-detail__error-message">
          Por favor accede a la ficha a través del listado
        </p>
      )}
    </>
  );
};
