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
import { createUser, getUser } from '../api/users';

export const useController = () => {
  const dispatch = useDispatch();
  const charactersState = useSelector(
    (state: RootState) => state.CharactersReducer
  );
  const appState = useSelector((state: RootState) => state.AppReducer);

  const login = useCallback(
    async (userName: string) => {
      let userData = await getUser(userName);
      if (!userData) userData = await createUser(userName);
      dispatch(setLoginData({ logged: true, user: userData }));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(setLoginData({ logged: false, user: null }));
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
