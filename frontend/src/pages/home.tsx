import { Header } from "../modules/header/header";
import { CharactersList } from "../modules/characters-list/characters-list";
import { ListNavigation } from "../modules/list-navigation/list-navigation";
import { Footer } from "../modules/footer/footer";
import { useController } from "../controller/useController";
import { useEffect } from "react";

export const Home = () => {
  const { loadCharactersList, selectedPage } = useController();

  useEffect(() => {
    loadCharactersList(selectedPage);
  }, [loadCharactersList, selectedPage]);
  return (
    <>
      <Header />
      <CharactersList />
      <ListNavigation />
      <Footer />
    </>
  );
};
