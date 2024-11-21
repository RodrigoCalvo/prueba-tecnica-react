import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCallback } from 'react';
import {
  setError,
  setLoading,
  setLoginData,
  setSelectedPage as setSelectedPageRdx,
} from '../store/slices/app-slice';
import { getCharactersList } from '../api/characters';
import {
  setCharactersList,
  setSelectedCharacter as setSelectedCharacterRdx,
} from '../store/slices/characters-slice';
import { CharacterVM } from '../models/characters';

export const useController = () => {
  const dispatch = useDispatch();
  const charactersState = useSelector(
    (state: RootState) => state.CharactersReducer
  );
  const appState = useSelector((state: RootState) => state.AppReducer);

  const login = useCallback(
    (user: string) => {
      dispatch(setLoginData({ logged: true, user }));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(setLoginData({ logged: false, user: '' }));
    dispatch(setSelectedPageRdx(0));
  }, [dispatch]);

  const loadCharactersList = useCallback(
    async (page: number) => {
      try {
        dispatch(setLoading(true));
        const charactersList = await getCharactersList(page);
        dispatch(setCharactersList(charactersList));
      } catch (error: any) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const setSelectedCharacter = useCallback(
    (character: CharacterVM) => {
      dispatch(setSelectedCharacterRdx(character));
    },
    [dispatch]
  );

  const setSelectedPage = useCallback(
    (page: number) => {
      dispatch(setSelectedPageRdx(page));
    },
    [dispatch]
  );

  return {
    ...charactersState,
    ...appState,
    login,
    logout,
    loadCharactersList,
    setSelectedPage,
    setSelectedCharacter,
  };
};
