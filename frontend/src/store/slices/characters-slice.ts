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
  },
});

export const { setCharactersList, setSelectedCharacter } =
  charactersSlice.actions;

export default charactersSlice.reducer;
