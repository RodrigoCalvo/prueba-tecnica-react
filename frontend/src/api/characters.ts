import { API_BASE_URL, CHARACTERS_LIST_ENDPOINT } from '../config/apiConfig';

export const getCharactersList = (page: number) => {
    return fetch(`${API_BASE_URL}${CHARACTERS_LIST_ENDPOINT}${page}`, {
        method: 'GET',
    }).then((resp) => resp.json());
};
