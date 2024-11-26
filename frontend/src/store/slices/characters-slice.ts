import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersInitalStateVM } from '../../models/initial-state';

const initialState: CharactersInitalStateVM = {
  charactersList: {
    attributionText: '',
    data: [],
    pagination: {
      elements: 0,
      page: 0,
      totalPages: 0,
    },
  },
  selectedCharacter: {
    id: 0,
    name: '',
    description: '',
    image: '',
    comics: {
      total: 0,
      displayed: 0,
    },
    comments: [],
    ratings: [],
  },
  selectedCharacterComics: {
    attributionText: '',
    data: [],
    pagination: {
      elements: 0,
      page: 0,
      totalPages: 0,
    },
  },
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,

  reducers: {
    setCharactersList: (
      state,
      { payload }: PayloadAction<CharactersInitalStateVM['charactersList']>
    ) => {
      state.charactersList = payload;
    },
    setSelectedCharacter: (
      state,
      { payload }: PayloadAction<CharactersInitalStateVM['selectedCharacter']>
    ) => {
      state.selectedCharacter = payload;
    },
    setSelectedCharacterComics: (
      state,
      {
        payload,
      }: PayloadAction<CharactersInitalStateVM['selectedCharacterComics']>
    ) => {
      state.selectedCharacterComics = payload;
    },

    addCharacterComment: (
      state,
      {
        payload,
      }: PayloadAction<{
        characterId: CharactersInitalStateVM['charactersList']['data'][number]['id'];
        addedComment: CharactersInitalStateVM['charactersList']['data'][number]['comments'][number];
      }>
    ) => {
      const { characterId, addedComment } = payload;
      const character = state.charactersList.data.find(
        (char) => char.id === characterId
      );
      if (character) {
        character.comments?.push(addedComment);
      }
      state.selectedCharacter.comments?.push(addedComment);
    },
    deleteCharacterComment: (
      state,
      {
        payload,
      }: PayloadAction<{
        characterId: CharactersInitalStateVM['charactersList']['data'][number]['id'];
        commentId: CharactersInitalStateVM['charactersList']['data'][number]['comments'][number]['id'];
      }>
    ) => {
      const { characterId, commentId } = payload;
      const character = state.charactersList.data.find(
        (char) => char.id === characterId
      );
      if (character) {
        character.comments = character.comments.filter(
          (comment) => comment.id !== commentId
        );
      }
      state.selectedCharacter.comments =
        state.selectedCharacter.comments.filter(
          (comment) => comment.id !== commentId
        );
    },
    addCharacterRating: (
      state,
      {
        payload,
      }: PayloadAction<{
        characterId: CharactersInitalStateVM['charactersList']['data'][number]['id'];
        addedRating: CharactersInitalStateVM['charactersList']['data'][number]['ratings'][number];
      }>
    ) => {
      const { characterId, addedRating } = payload;
      const character = state.charactersList.data.find(
        (char) => char.id === characterId
      );
      if (character) {
        character.ratings?.push(addedRating);
      }
      state.selectedCharacter.ratings?.push(addedRating);
    },
    changeCharacterRating: (
      state,
      {
        payload,
      }: PayloadAction<{
        characterId: CharactersInitalStateVM['charactersList']['data'][number]['id'];
        changedRating: CharactersInitalStateVM['charactersList']['data'][number]['ratings'][number];
      }>
    ) => {
      const { characterId, changedRating } = payload;
      const character = state.charactersList.data.find(
        (char) => char.id === characterId
      );
      if (character) {
        const ratingIndex = character.ratings.findIndex(
          (rating) => rating.user === changedRating.user
        );
        if (ratingIndex !== -1) {
          character.ratings[ratingIndex] = changedRating;
        }
      }
      const selectedCharRatingIndex = state.selectedCharacter.ratings.findIndex(
        (rating) => rating.user === changedRating.user
      );
      if (selectedCharRatingIndex !== -1) {
        state.selectedCharacter.ratings[selectedCharRatingIndex] =
          changedRating;
      }
    },
  },
});

export const {
  setCharactersList,
  setSelectedCharacter,
  setSelectedCharacterComics,
  addCharacterComment,
  deleteCharacterComment,
  addCharacterRating,
  changeCharacterRating,
} = charactersSlice.actions;

export default charactersSlice.reducer;
