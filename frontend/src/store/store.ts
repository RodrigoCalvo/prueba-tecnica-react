import { configureStore, combineReducers } from '@reduxjs/toolkit';
import CharactersReducer from './slices/characters-slice';
import AppReducer from './slices/app-slice';

const rootReducer = combineReducers({
  CharactersReducer,
  AppReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
