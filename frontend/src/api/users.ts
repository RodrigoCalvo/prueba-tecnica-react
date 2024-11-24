import {
  API_BASE_URL,
  USER_CREATE_USER_ENDPOINT,
  USER_LIKE_ADD_ENDPOINT,
  USER_LIKE_DELETE_ENDPOINT,
  USER_PROFILE_ENDPOINT,
} from '../config/apiConfig';
import { User } from '../models/users';

export const getUser = async (userName: string): Promise<User | undefined> => {
  const url = `${API_BASE_URL}${USER_PROFILE_ENDPOINT}${userName}`;
  return await fetch(url, { method: USER_PROFILE_ENDPOINT.method }).then(
    (resp) => resp.json()
  );
};

export const createUser = async (userName: string): Promise<User> => {
  const url = `${API_BASE_URL}${USER_CREATE_USER_ENDPOINT}`;
  const body = JSON.stringify({ userName });
  return await fetch(url, {
    method: USER_CREATE_USER_ENDPOINT.method,
    body,
  }).then((resp) => resp.json());
};

export const createUserLike = async (
  userId: string,
  characterId: number
): Promise<boolean> => {
  const url = `${API_BASE_URL}${USER_LIKE_ADD_ENDPOINT}`;
  const body = JSON.stringify({ userId, characterId });
  return await fetch(url, { method: USER_LIKE_ADD_ENDPOINT.method, body })
    .then((resp) => resp.json())
    .then((resp: { success: boolean }) => resp.success)
    .catch((error) => {
      console.error(error);
      return false;
    });
};

export const deleteUserLike = async (
  userId: string,
  characterId: number
): Promise<boolean> => {
  const url = `${API_BASE_URL}${USER_LIKE_DELETE_ENDPOINT}`;
  const body = JSON.stringify({ userId, characterId });
  return await fetch(url, { method: USER_LIKE_DELETE_ENDPOINT.method, body })
    .then((resp) => resp.json())
    .then((resp: { success: boolean }) => resp.success)
    .catch((error) => {
      console.error(error);
      return false;
    });
};
