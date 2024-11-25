import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Character } from "./pages/character";
import { LoginValidate } from "./modules/login-validate/login-validate";

function App() {
  const routerOptions: Array<{ path: string; label: string; page: any }> = [
    { path: "/", label: "Login", page: <Login></Login> },
    {
      path: "/home",
      label: "Inicio",
      page: (
        <LoginValidate>
          <Home></Home>
        </LoginValidate>
      ),
    },
    {
      path: "/character/:id",
      label: "Detalles",
      page: (
        <LoginValidate>
          <Character></Character>
        </LoginValidate>
      ),
    },
  ];
  return (
    <Routes>
      {routerOptions.map((item) => (
        <Route key={item.label} path={item.path} element={item.page}></Route>
      ))}
    </Routes>
  );
}

export default App;
