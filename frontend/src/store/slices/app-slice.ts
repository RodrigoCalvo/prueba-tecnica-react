import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStatusInitialStateVM } from '../../models/initial-state';

const initialState: AppStatusInitialStateVM = {
  loginState: {
    logged: false,
    user: null,
  },
  selectedPage: 0,
  isLoading: false,
  error: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoginData: (
      state,
      { payload }: PayloadAction<AppStatusInitialStateVM['loginState']>
    ) => {
      state.loginState = payload;
    },
    setSelectedPage: (
      state,
      { payload }: PayloadAction<AppStatusInitialStateVM['selectedPage']>
    ) => {
      state.selectedPage = payload;
    },
    setLoading: (
      state,
      { payload }: PayloadAction<AppStatusInitialStateVM['isLoading']>
    ) => {
      state.isLoading = payload;
    },
    setError: (
      state,
      { payload }: PayloadAction<AppStatusInitialStateVM['error']>
    ) => {
      state.error = payload;
    },
  },
});

export const { setLoginData, setSelectedPage, setLoading, setError } =
  appSlice.actions;

export default appSlice.reducer;
