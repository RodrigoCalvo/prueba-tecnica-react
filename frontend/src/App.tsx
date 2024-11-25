import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Character } from "./pages/character";

function App() {
  const routerOptions: Array<{ path: string; label: string; page: any }> = [
    { path: "/", label: "Login", page: <Login></Login> },
    { path: "/home", label: "Inicio", page: <Home></Home> },
    {
      path: "/character/:id",
      label: "Detalles",
      page: <Character></Character>,
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
