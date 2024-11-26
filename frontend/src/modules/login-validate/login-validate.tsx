import { useController } from "../../controller/useController";
import { Login } from "../../pages/login";

export const LoginValidate = ({ children }: { children: JSX.Element }) => {
  const { loginState } = useController();
  return loginState.logged ? children : <Login />;
};
