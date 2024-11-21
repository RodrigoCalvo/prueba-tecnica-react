import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCallback } from 'react';
import { setError, setLoading, setLoginData } from '../store/slices/app-slice';
import { getCharactersList } from '../api/characters';
import { setCharactersList } from '../store/slices/characters-slice';

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
  }, [dispatch]);

  const loadCharactersList = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const charactersList = await getCharactersList(0);
      dispatch(setCharactersList(charactersList));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    ...charactersState,
    ...appState,
    login,
    logout,
    loadCharactersList,
  };
};
