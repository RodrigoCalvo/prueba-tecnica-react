import { Provider } from "react-redux";
import Store from "./store";

const ReduxProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element;
}) => <Provider store={Store}>{children}</Provider>;

export default ReduxProvider;
