import { SyntheticEvent, useCallback, useMemo } from "react";
import { useController } from "../../controller/useController";
import "./character-detail.css";
import { StarRating } from "./components/star-rating";
import { ImagesGallery } from "./components/images-gallery";
import { CommentsList } from "./components/comments-list";
import { CommentTextbox } from "./components/comment-textbox";

export const CharacterDetail = () => {
  const {
    isLoading,
    selectedCharacter,
    selectedCharacterComics,
    loginState,
    likeCharacter,
    unlikeCharacter,
  } = useController();
  const isLiked = useMemo(
    () =>
      !!loginState.user?.likedCharacters?.find(
        (char) => char.id === selectedCharacter.id
      ),
    [selectedCharacter, loginState]
  );

  const handleLikeClick = useCallback(() => {
    if (isLiked) {
      unlikeCharacter(loginState.user!.id, selectedCharacter.id);
    } else {
      likeCharacter(loginState.user!.id, selectedCharacter.id);
    }
  }, [selectedCharacter, isLiked, loginState, likeCharacter, unlikeCharacter]);

  //console.log(selectedCharacterComics);

  const userRating = 2;
  const averageRating = 5;
  const handleStarClick = (num: number) => {
    console.log(num);
  };
  const handleCommentSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const evTarget = ev.target as HTMLFormElement;
    const textArea = evTarget.firstChild as HTMLTextAreaElement;
    console.log(textArea.value);
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
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
            <div className="character-detail__actions">
              <div className="character-detail__rating">
                <span className="character-detail__rating-label">
                  Tu puntuación:
                </span>
                <StarRating
                  handleStarClick={handleStarClick}
                  currentRating={userRating}
                />
              </div>
              <p className="character-detail__average-rating">
                Media: {averageRating}/10
              </p>
              <button
                className={`character-detail__favorite ${
                  isLiked ? "character-detail__favorite--active" : ""
                }`}
                onClick={handleLikeClick}
              >
                ❤
              </button>
            </div>
          </header>
          <section className="character-detail__info">
            {!!selectedCharacter.description && (
              <>
                <h3 className="character-detail__subtitle">Descripción:</h3>
                <p className="character-detail__description">
                  {selectedCharacter.description}
                </p>
              </>
            )}
            {!!selectedCharacterComics.pagination.elements && (
              <ImagesGallery
                title="Listado de cómics:"
                data={selectedCharacterComics.data.map((comic) => ({
                  img: comic.thumbnail,
                  subtitle: comic.title,
                }))}
              />
            )}
          </section>
          <section className="character-detail__comments">
            <CommentsList
              title="Comentarios:"
              comments={selectedCharacter.comments}
              emptyText="No hay comentarios aún. ¡Sé el primero en comentar!"
            />
            <CommentTextbox
              placeholder="Escribe tu comentario..."
              buttonText="Enviar"
              handleSubmit={handleCommentSubmit}
            />
          </section>
        </div>
      )}
    </>
  );
};
