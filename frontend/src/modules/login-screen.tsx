import { SyntheticEvent, useState } from "react";
import { useController } from "../controller/useController";
import "./login-screen.css";

function LoginScreen() {
  const { login } = useController();
  const [userName, setUserName] = useState("Paso abierto para pruebas"); // Pruebas

  const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
    const evTarget = event.target as HTMLInputElement;
    setUserName(evTarget.value);
  };
  const handleLoginClick = () => {
    !!userName && login(userName.trim());
  };
  const handleInputKey = (event: SyntheticEvent<HTMLInputElement>) => {
    if ((event as any).key === "Enter") handleLoginClick();
  };

  return (
    <div className="login-screen">
      <h1 className="login-screen__title">Marvel Characters</h1>
      <p className="login-screen__subtitle">Login</p>
      <input
        type="text"
        name="userName"
        id="userName"
        value={userName}
        placeholder="User name"
        className="login-screen__text-input"
        onChange={handleInput}
        onKeyDown={handleInputKey}
      />
      <button className="login-screen__login-button" onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
}

export default LoginScreen;
