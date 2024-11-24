export const API_BASE_URL = 'http://localhost:3200/';

type Endpoint = {
  method: string;
  endpoint: string;
  params?: Array<string>;
  body?: Record<string, any>;
};

export const CHARACTERS_LIST_ENDPOINT: Endpoint = {
  method: 'GET',
  endpoint: 'characters/',
  params: ['page'],
};

export const CHARACTER_PROFILE_ENDPOINT: Endpoint = {
  method: 'GET',
  endpoint: 'character/',
  params: ['id'],
};
export const CHARACTER_COMICS_LIST_ENDPOINT: Endpoint = {
  method: 'GET',
  endpoint: 'character/comics/',
  params: ['id'],
};
export const CHARACTER_COMMENT_ADD_ENDPOINT: Endpoint = {
  method: 'POST',
  endpoint: 'character/comments',
  body: { characterId: 0, comment: { textContent: '', user: '' } },
};
export const CHARACTER_RATING_ADD_ENDPOINT: Endpoint = {
  method: 'POST',
  endpoint: 'character/ratings',
  body: { characterId: 0, rating: { rating: 0, user: '' } },
};
export const CHARACTER_RATING_CHANGE_ENDPOINT: Endpoint = {
  method: 'PATCH',
  endpoint: 'character/ratings',
  body: { characterId: 0, rating: { rating: 0, user: '' } },
};
export const CHARACTER_COMMENT_DELETE_ENDPOINT: Endpoint = {
  method: 'DELETE',
  endpoint: 'character/comments',
  body: { characterId: 0, commentId: '' },
};

export const USER_PROFILE_ENDPOINT: Endpoint = {
  method: 'GET',
  endpoint: 'users/',
  params: ['name'],
};
export const USER_CREATE_USER_ENDPOINT: Endpoint = {
  method: 'POST',
  endpoint: 'users/',
  body: { userName: '' },
};
export const USER_LIKE_ADD_ENDPOINT: Endpoint = {
  method: 'PATCH',
  endpoint: 'users/likes/add',
  body: { userId: '', characterId: 0 },
};
export const USER_LIKE_DELETE_ENDPOINT: Endpoint = {
  method: 'PATCH',
  endpoint: 'users/likes/remove',
  body: { userId: '', characterId: 0 },
};
