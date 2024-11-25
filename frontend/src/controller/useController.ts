import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCallback } from 'react';
import {
  addUserLike,
  removeUserLike,
  setError,
  setLoading,
  setLoginData,
  setSelectedPage as setSelectedPageRdx,
} from '../store/slices/app-slice';
import { getCharacter, getCharactersList } from '../api/characters';
import {
  setCharactersList,
  setSelectedCharacter as setSelectedCharacterRdx,
} from '../store/slices/characters-slice';
import {
  createUser,
  createUserLike,
  deleteUserLike,
  getUser,
} from '../api/users';
import { User } from '../models/users';

export const useController = () => {
  const dispatch = useDispatch();
  const charactersState = useSelector(
    (state: RootState) => state.CharactersReducer
  );
  const appState = useSelector((state: RootState) => state.AppReducer);

  const login = useCallback(
    async (userName: string) => {
      let userData = await getUser(userName);
      if (!Object.keys(userData).length) userData = await createUser(userName);
      dispatch(setLoginData({ logged: true, user: userData as User }));
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

  const likeCharacter = useCallback(
    async (userId: string, characterId: number) => {
      createUserLike(userId, characterId).then((success) => {
        if (success) {
          dispatch(addUserLike({ id: characterId }));
        }
      });
    },
    [dispatch]
  );

  const unlikeCharacter = useCallback(
    async (userId: string, characterId: number) => {
      deleteUserLike(userId, characterId).then((success) => {
        if (success) {
          dispatch(removeUserLike({ id: characterId }));
        }
      });
    },
    [dispatch]
  );

  const setSelectedCharacter = useCallback(
    async (characterId: number) => {
      const data = await getCharacter(Number(characterId));
      dispatch(setSelectedCharacterRdx(data?.character));
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
    likeCharacter,
    unlikeCharacter,
    setSelectedPage,
    setSelectedCharacter,
  };
};
