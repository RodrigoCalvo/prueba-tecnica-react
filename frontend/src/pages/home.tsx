import { Header } from "../modules/header/header";
import { CharactersList } from "../modules/characters-list/characters-list";
import { ListNavigation } from "../modules/list-navigation/list-navigation";
import { Footer } from "../modules/footer/footer";

export const Home = () => {
  return (
    <>
      <Header />
      <CharactersList />
      <ListNavigation />
      <Footer />
    </>
  );
};
