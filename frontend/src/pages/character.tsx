import { useEffect } from "react";
import { CharacterDetail } from "../modules/character-detail/character-detail";
import { Footer } from "../modules/footer/footer";
import { Header } from "../modules/header/header";
import { useController } from "../controller/useController";
import { MARVEL_CHAR_ID_LENGHT } from "../config/apiConfig";

export const Character = () => {
  const { selectedCharacter, setSelectedCharacter } = useController();
  useEffect(() => {
    const currentUrl = window.location.href.split("?")[0];
    const characterId = currentUrl.split("/").at(-1);
    if (
      !characterId ||
      characterId.length !== MARVEL_CHAR_ID_LENGHT ||
      isNaN(Number(characterId)) ||
      Number(characterId) <= 0 ||
      !Number.isInteger(Number(characterId))
    )
      return;
    if (!selectedCharacter.id || Number(characterId) !== selectedCharacter.id) {
      setSelectedCharacter(Number(characterId));
    }
  }, [selectedCharacter.id, setSelectedCharacter]);
  return (
    <>
      <Header></Header>
      <CharacterDetail></CharacterDetail>
      <Footer></Footer>
    </>
  );
};
