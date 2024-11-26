import { FormEvent, FormEventHandler, SyntheticEvent, useState } from "react";

export const CommentTextbox = ({
  placeholder,
  buttonText,
  handleSubmit,
}: {
  placeholder: string;
  buttonText: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (ev: SyntheticEvent) => {
    const evTarget = ev.target as HTMLTextAreaElement;
    setNewComment(evTarget.value);
  };
  const handleSubmitButtonClick = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    handleSubmit(ev);
    setNewComment("");
  };

  return (
    <>
      <form
        className="character-detail__comment-form"
        onSubmit={handleSubmitButtonClick}
      >
        <textarea
          className="character-detail__comment-input"
          placeholder={placeholder}
          value={newComment}
          onChange={handleCommentChange}
          required
        ></textarea>
        <button className="character-detail__comment-submit" type="submit">
          {buttonText}
        </button>
      </form>
    </>
  );
};
