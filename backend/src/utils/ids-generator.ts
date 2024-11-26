export const generateCommentId = () => {
  return Math.floor(Math.random() * 1_000_000).toString();
};

export const generateUserId = () => {
  return `U${Math.floor(Math.random() * 1_000_000)}`;
};
