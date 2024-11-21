import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersInitalStateVM } from '../../models/initial-state';

const initialState: CharactersInitalStateVM = {
  charactersList: {
    attributionHTML: '',
    data: [],
    pagination: {
      elements: 0,
      page: 0,
    },
  },
  selectedCharacter: {
    id: 0,
    name: '',
    description: '',
    image: '',
    comics: {
      count: {
        total: 0,
        displayed: 0,
      },
      titles: [],
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

export const { setCharactersList } = charactersSlice.actions;

export default charactersSlice.reducer;
