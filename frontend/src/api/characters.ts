import {
  API_BASE_URL,
  CHARACTER_COMICS_LIST_ENDPOINT,
  CHARACTER_PROFILE_ENDPOINT,
  CHARACTERS_LIST_ENDPOINT,
  CHARACTER_COMMENT_ADD_ENDPOINT,
  CHARACTER_RATING_ADD_ENDPOINT,
  CHARACTER_RATING_CHANGE_ENDPOINT,
  CHARACTER_COMMENT_DELETE_ENDPOINT,
  JSON_HEADER,
} from '../config/apiConfig';
import {
  CharactersListVM,
  CharacterVM,
  ComicsListVM,
  Comment,
  Rating,
} from '../models/characters';

export const getCharactersList = async (
  page: number
): Promise<CharactersListVM> => {
  const url = `${API_BASE_URL}${CHARACTERS_LIST_ENDPOINT.endpoint}${page}`;
  return await fetch(url, { method: CHARACTERS_LIST_ENDPOINT.method }).then(
    (resp) => resp.json()
  );
};

export const getCharacter = async (
  id: number
): Promise<{ attributionText: string; character: CharacterVM }> => {
  const url = `${API_BASE_URL}${CHARACTER_PROFILE_ENDPOINT.endpoint}${id}`;
  return await fetch(url, { method: CHARACTER_PROFILE_ENDPOINT.method }).then(
    (resp) => resp.json()
  );
};

export const getCharacterComics = async (id: number): Promise<ComicsListVM> => {
  const url = `${API_BASE_URL}${CHARACTER_COMICS_LIST_ENDPOINT.endpoint}${id}`;
  return await fetch(url, {
    method: CHARACTER_COMICS_LIST_ENDPOINT.method,
  }).then((resp) => resp.json());
};

export const addComment = async (
  characterId: number,
  comment: Pick<Comment, 'textContent' | 'user'>
): Promise<boolean> => {
  const url = `${API_BASE_URL}${CHARACTER_COMMENT_ADD_ENDPOINT.endpoint}`;
  const body = JSON.stringify({ characterId, comment });
  return await fetch(url, {
    method: CHARACTER_COMMENT_ADD_ENDPOINT.method,
    body,
    headers: JSON_HEADER,
  })
    .then((resp) => resp.json() as Promise<{ success: boolean }>)
    .then((resp) => resp.success);
};

export const addRating = async (
  characterId: number,
  rating: Rating
): Promise<boolean> => {
  const url = `${API_BASE_URL}${CHARACTER_RATING_ADD_ENDPOINT.endpoint}`;
  const body = JSON.stringify({ characterId, rating });
  return await fetch(url, {
    method: CHARACTER_RATING_ADD_ENDPOINT.method,
    body,
    headers: JSON_HEADER,
  })
    .then((resp) => resp.json() as Promise<{ success: boolean }>)
    .then((resp) => resp.success);
};

export const changeRating = async (
  characterId: number,
  rating: Rating
): Promise<boolean> => {
  const url = `${API_BASE_URL}${CHARACTER_RATING_CHANGE_ENDPOINT.endpoint}`;
  const body = JSON.stringify({ characterId, rating });
  return await fetch(url, {
    method: CHARACTER_RATING_CHANGE_ENDPOINT.method,
    body,
    headers: JSON_HEADER,
  })
    .then((resp) => resp.json() as Promise<{ success: boolean }>)
    .then((resp) => resp.success);
};

export const deleteComment = async (
  characterId: number,
  commentId: Comment['id']
): Promise<boolean> => {
  const url = `${API_BASE_URL}${CHARACTER_COMMENT_DELETE_ENDPOINT.endpoint}`;
  const body = JSON.stringify({ characterId, commentId });
  return await fetch(url, {
    method: CHARACTER_COMMENT_DELETE_ENDPOINT.method,
    body,
    headers: JSON_HEADER,
  })
    .then((resp) => resp.json() as Promise<{ success: boolean }>)
    .then((resp) => resp.success);
};
