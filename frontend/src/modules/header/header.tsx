import { useNavigate, Link } from "react-router-dom";
import { useController } from "../../controller/useController";
import "./header.css";

export const Header = () => {
  const { loginState, logout } = useController();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/home">Marvel Characters</Link>
      </h1>
      <div className="header__user-actions">
        <p className="header__welcome-message">
          Bienvenida/o, {loginState.user}
        </p>
        <button className="header__logout-button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </header>
  );
};
