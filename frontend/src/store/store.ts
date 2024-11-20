import { configureStore, combineReducers } from '@reduxjs/toolkit';
import CharactersReducer from './slices/characters-slice';

const rootReducer = combineReducers({
  CharactersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
