import { useController } from "../controller/useController";
import "./footer.css";

export const Footer = () => {
  const { charactersList } = useController();

  return (
    <footer className="footer">
      <p className="footer__attribution-text">
        {charactersList.attributionText}
      </p>
    </footer>
  );
};
