import { CharacterDetail } from "../modules/character-detail/character-detail";
import { Footer } from "../modules/footer/footer";
import { Header } from "../modules/header/header";

export const Character = () => {
  return (
    <>
      <Header></Header>
      <CharacterDetail></CharacterDetail>
      <Footer></Footer>
    </>
  );
};
