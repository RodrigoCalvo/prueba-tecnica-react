import { SyntheticEvent, useCallback, useMemo } from "react";
import { useController } from "../../controller/useController";
import "./character-detail.css";
import { StarRating } from "./components/star-rating";
import { ImagesGallery } from "./components/images-gallery";
import { CommentsList } from "./components/comments-list";
import { CommentTextbox } from "./components/comment-textbox";
import { Comment, Rating } from "../../models/characters";

export const CharacterDetail = () => {
  const {
    isLoading,
    selectedCharacter,
    selectedCharacterComics,
    loginState,
    likeCharacter,
    unlikeCharacter,
    addRatingToCharacter,
    changeRatingFromCharacter,
    addCommentToCharacter,
  } = useController();
  const isLiked = useMemo(
    () =>
      !!loginState.user?.likedCharacters?.find(
        (char) => char.id === selectedCharacter.id
      ),
    [selectedCharacter.id, loginState]
  );

  const userRating = useMemo(() => {
    const rating = selectedCharacter.ratings.find(
      (rating) => rating.user === loginState.user?.name
    );
    return rating?.rating || 0;
  }, [loginState, selectedCharacter.ratings]);

  const averageRating = useMemo(() => {
    const ratingsArray = selectedCharacter.ratings.map(
      (rating) => rating.rating
    );
    if (ratingsArray.length) {
      const summatory = ratingsArray.reduce((acc, current) => acc + current, 0);
      return summatory / ratingsArray.length;
    } else return 0;
  }, [selectedCharacter.ratings]);

  const handleLikeClick = () => {
    if (isLiked) {
      unlikeCharacter(loginState.user!.id, selectedCharacter.id);
    } else {
      likeCharacter(loginState.user!.id, selectedCharacter.id);
    }
  };

  const handleStarClick = useCallback(
    (num: number) => {
      const rating: Rating = {
        rating: num,
        user: loginState.user?.name ?? "Anonymous",
      };
      if (userRating) {
        changeRatingFromCharacter(selectedCharacter.id, rating);
      } else {
        addRatingToCharacter(selectedCharacter.id, rating);
      }
    },
    [
      userRating,
      loginState.user?.name,
      selectedCharacter.id,
      addRatingToCharacter,
      changeRatingFromCharacter,
    ]
  );

  const handleCommentSubmit = useCallback(
    (ev: SyntheticEvent) => {
      ev.preventDefault();
      const evTarget = ev.target as HTMLFormElement;
      const textArea = evTarget.firstChild as HTMLTextAreaElement;
      const comment: Pick<Comment, "textContent" | "user"> = {
        textContent: textArea.value,
        user: loginState.user?.name ?? "Anonymous",
      };
      addCommentToCharacter(selectedCharacter.id, comment);
    },
    [loginState, selectedCharacter.id, addCommentToCharacter]
  );

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
