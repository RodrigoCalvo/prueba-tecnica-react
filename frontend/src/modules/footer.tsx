import { useController } from "../controller/useController";

export const Footer = () => {
  const { charactersList } = useController();

  return (
    <>
      <p>{charactersList.attributionText}</p>
    </>
  );
};
