import { useController } from "../../controller/useController";
import "./header.css";

export const Header = () => {
  const { loginState, logout } = useController();

  return (
    <header className="header">
      <h1 className="header__title">Marvel Characters</h1>
      <div className="header__user-actions">
        <p className="header__welcome-message">
          Bienvenida/o, {loginState.user}
        </p>
        <button className="header__logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};
