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
import {
  addComment,
  addRating,
  changeRating,
  deleteComment,
  getCharacter,
  getCharacterComics,
  getCharactersList,
} from '../api/characters';
import {
  setCharactersList,
  setSelectedCharacter as setSelectedCharacterRdx,
  addCharacterComment,
  deleteCharacterComment,
  changeCharacterRating,
  addCharacterRating,
  setSelectedCharacterComics,
} from '../store/slices/characters-slice';
import {
  createUser,
  createUserLike,
  deleteUserLike,
  getUser,
} from '../api/users';
import { User } from '../models/users';
import { Comment, Rating } from '../models/characters';

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

  const addRatingToCharacter = useCallback(
    async (characterId: number, rating: Rating) => {
      addRating(characterId, rating).then((addedRating) => {
        if (addedRating) {
          dispatch(addCharacterRating({ characterId, addedRating }));
        }
      });
    },
    [dispatch]
  );
  const changeRatingFromCharacter = useCallback(
    async (characterId: number, rating: Rating) => {
      changeRating(characterId, rating).then((changedRating) => {
        if (changedRating) {
          dispatch(changeCharacterRating({ characterId, changedRating }));
        }
      });
    },
    [dispatch]
  );
  const addCommentToCharacter = useCallback(
    async (characterId: number, comment: Comment) => {
      addComment(characterId, comment).then((addedComment) => {
        if (addedComment) {
          dispatch(addCharacterComment({ characterId, addedComment }));
        }
      });
    },
    [dispatch]
  );
  const deleteCommentFromCharacter = useCallback(
    async (characterId: number, commentId: string) => {
      deleteComment(characterId, commentId).then((success) => {
        if (success) {
          dispatch(deleteCharacterComment({ characterId, commentId }));
        }
      });
    },
    [dispatch]
  );

  const setSelectedCharacter = useCallback(
    async (characterId: number) => {
      try {
        dispatch(setLoading(true));
        const data = await getCharacter(Number(characterId));
        const comics = await getCharacterComics(Number(characterId));
        dispatch(setSelectedCharacterRdx(data?.character));
        dispatch(setSelectedCharacterComics(comics));
      } catch (error: any) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
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
    addCommentToCharacter,
    deleteCommentFromCharacter,
    addRatingToCharacter,
    changeRatingFromCharacter,
    setSelectedPage,
    setSelectedCharacter,
  };
};
