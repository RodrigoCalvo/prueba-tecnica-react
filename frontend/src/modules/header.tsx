import { useController } from "../controller/useController";

export const Header = () => {
  const { loginState, logout } = useController();

  return (
    <div>
      <h1>Marvel Characters</h1>
      <p>Bienvenido, {loginState.user}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
