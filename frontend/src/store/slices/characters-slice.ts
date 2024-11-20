import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,

  reducers: {
    myFunction: () => {},
  },
});

export const { myFunction: nada } = charactersSlice.actions;

export default charactersSlice.reducer;
