import { CharactersListVM, CharacterVM } from './characters';

export type AppStatusInitialStateVM = {
  loginState: {
    logged: boolean;
    user: string;
  };
  selectedPage: number;
  isLoading: boolean;
  error: string;
};

export type CharactersInitalStateVM = {
  charactersList: CharactersListVM;
  selectedCharacter: CharacterVM;
};
