import { API_BASE_URL, CHARACTERS_LIST_ENDPOINT } from '../config/apiConfig';
import { CharactersListVM } from '../models/characters';

export const getCharactersList = (page: number): Promise<CharactersListVM> => {
  return fetch(`${API_BASE_URL}${CHARACTERS_LIST_ENDPOINT}${page}`, {
    method: 'GET',
  }).then((resp) => resp.json());
};
