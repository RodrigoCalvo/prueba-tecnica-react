import {
  MARVEL_CHARACTER_PROFILE_ENDPOINT,
  MARVEL_CHARACTERS_LIST_ENDPOINT,
  PAGE_SIZE,
} from '../config/apiConfig';
import {
  MarvelServiceListVM,
  MarvelServiceCharacterDataVM,
  MarvelServiceComicDataVM,
} from '../models/marvel-service';
import { fetchMarvel } from './marvel-service-db';
import path from 'path';
import { readData, writeData } from '../utils/filesystem';
import { CharacterDbVM, Comment, Rating } from '../models/characters';

const DATA_FILE = path.join(__dirname, '/json/characters.json');

export const fetchCharacters = async (page: string = '0') => {
  const marvelData = await fetchMarvel<
    MarvelServiceListVM<MarvelServiceCharacterDataVM>
  >(MARVEL_CHARACTERS_LIST_ENDPOINT, {
    ...(Number(page) ? { offset: Number(page) * PAGE_SIZE } : {}),
  });
  if (!marvelData) return null;

  const dbData = readData<Array<CharacterDbVM>>(DATA_FILE);
  return { marvelData, dbData };
};

export const fetchCharacter = async (id: number) => {
  const marvelData = await fetchMarvel<
    MarvelServiceListVM<MarvelServiceCharacterDataVM>
  >(`${MARVEL_CHARACTER_PROFILE_ENDPOINT}${id}`);
  if (!marvelData) return null;

  const dbData = readData<Array<CharacterDbVM>>(DATA_FILE)?.find(
    (character) => character.id === id
  );
  return { marvelData, dbData };
};

export const fetchCharacterComics = async (id: number) => {
  return await fetchMarvel<MarvelServiceListVM<MarvelServiceComicDataVM>>(
    `${MARVEL_CHARACTER_PROFILE_ENDPOINT}${id}/comics`
  );
};

export const saveCharacter = (character: CharacterDbVM) => {
  const previousDbData = readData<Array<CharacterDbVM>>(DATA_FILE) || [];
  const newDbData = [...previousDbData, character];
  writeData<Array<CharacterDbVM>>(DATA_FILE, newDbData);
  return true;
};

export const saveComment = (characterId: number, comment: Comment) => {
  const previousDbData = readData<Array<CharacterDbVM>>(DATA_FILE) || [];
  let previousCharacter = previousDbData.find(
    (char) => char.id === characterId
  );
  const newDbData = previousCharacter
    ? previousDbData.map((character) =>
        character.id === characterId
          ? { ...character, comments: [...character.comments, comment] }
          : character
      )
    : [
        ...previousDbData,
        { id: characterId, comments: [comment], ratings: [] },
      ];
  writeData<Array<CharacterDbVM>>(DATA_FILE, newDbData);
  return comment;
};

export const saveRating = (characterId: number, rating: Rating) => {
  const previousDbData = readData<Array<CharacterDbVM>>(DATA_FILE) || [];
  let previousCharacter = previousDbData.find(
    (char) => char.id === characterId
  );
  const newDbData = previousCharacter
    ? previousDbData.map((character) =>
        character.id === characterId
          ? { ...character, ratings: [...character.ratings, rating] }
          : character
      )
    : [...previousDbData, { id: characterId, comments: [], ratings: [rating] }];
  writeData<Array<CharacterDbVM>>(DATA_FILE, newDbData);
  return rating;
};

export const modifyRating = (characterId: number, rating: Rating) => {
  const previousDbData = readData<Array<CharacterDbVM>>(DATA_FILE) || [];
  let previousCharacter = previousDbData.find(
    (char) => char.id === characterId
  );
  if (!previousCharacter) return;
  if (
    !previousCharacter.ratings.some(
      (ratingItem) => ratingItem.user === rating.user
    )
  )
    return;
  const newDbData = previousDbData.map((character) =>
    character.id === characterId
      ? {
          ...character,
          ratings: [
            ...character.ratings.filter(
              (ratingItem) => ratingItem.user !== rating.user
            ),
            rating,
          ],
        }
      : character
  );
  writeData<Array<CharacterDbVM>>(DATA_FILE, newDbData);
  return rating;
};

export const deleteComment = (characterId: number, commentId: string) => {
  const previousDbData = readData<Array<CharacterDbVM>>(DATA_FILE) || [];
  let previousCharacter = previousDbData.find(
    (char) => char.id === characterId
  );
  if (!previousCharacter) return false;
  if (!previousCharacter.comments.some((comment) => comment.id === commentId))
    return false;
  const newDbData = previousDbData.map((character) =>
    character.id === characterId
      ? {
          ...character,
          comments: character.comments.filter(
            (comment) => comment.id !== commentId
          ),
        }
      : character
  );
  writeData<Array<CharacterDbVM>>(DATA_FILE, newDbData);
  return true;
};
