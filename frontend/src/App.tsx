import { useEffect } from "react";
import "./App.css";
import LoginScreen from "./modules/login-screen";
import { useController } from "./controller/useController";
import { Header } from "./modules/header";
import { CharactersList } from "./modules/characters-list";
import { ListNavigation } from "./modules/list-navigation";
import { Footer } from "./modules/footer";

function App() {
  const { loginState, loadCharactersList, selectedPage } = useController();
  useEffect(() => {
    loadCharactersList(selectedPage);
  }, [loadCharactersList, selectedPage]);

  return (
    <div className="App">
      {!loginState.logged ? (
        <LoginScreen />
      ) : (
        <>
          <Header />
          <CharactersList />
          <ListNavigation />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
