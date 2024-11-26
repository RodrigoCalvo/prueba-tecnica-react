export const CommentsList = <
  T extends { id: string; textContent: string; user: string }
>({
  title,
  comments,
  emptyText,
}: {
  title: string;
  comments: Array<T>;
  emptyText: string;
}) => {
  return (
    <>
      <h3 className="character-detail__comments-title">{title}</h3>
      <ul className="character-detail__comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index} className="character-detail__comment">
              <p className="character-detail__comment-text">
                {comment.textContent}
              </p>
              <span className="character-detail__comment-author">
                — {comment.user || "Anonymous"}
              </span>
            </li>
          ))
        ) : (
          <p className="character-detail__no-comments">{emptyText}</p>
        )}
      </ul>
    </>
  );
};
