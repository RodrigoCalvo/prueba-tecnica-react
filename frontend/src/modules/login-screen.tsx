import { SyntheticEvent, useState } from "react";
import { useController } from "../controller/useController";

function LoginScreen() {
  const { login } = useController();
  const [userName, setUserName] = useState("");

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
    <>
      <p>Login</p>
      <input
        type="text"
        name="userName"
        id="userName"
        placeholder="User name"
        onChange={handleInput}
        onKeyDown={handleInputKey}
      />
      <button onClick={handleLoginClick}>Login</button>
    </>
  );
}

export default LoginScreen;
