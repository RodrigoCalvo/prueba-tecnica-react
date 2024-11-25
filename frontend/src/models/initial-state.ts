import { CharactersListVM, CharacterVM, ComicsListVM } from './characters';
import { User } from './users';

export type AppStatusInitialStateVM = {
  loginState: {
    logged: boolean;
    user: User | null;
  };
  selectedPage: number;
  isLoading: boolean;
  error: string;
};

export type CharactersInitalStateVM = {
  charactersList: CharactersListVM;
  selectedCharacter: CharacterVM;
  selectedCharacterComics: ComicsListVM;
};
