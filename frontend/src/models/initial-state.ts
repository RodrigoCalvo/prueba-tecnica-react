import { CharactersListVM, CharacterVM } from './characters';

export type AppStatusInitialStateVM = {
  login: {
    logged: boolean;
    user: string;
  };
  isLoading: boolean;
  error: string;
};

export type CharactersInitalStateVM = {
  charactersList: CharactersListVM;
  selectedCharacter: CharacterVM;
};
