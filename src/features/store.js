import { configureStore } from '@reduxjs/toolkit';
import { MoviesReducer } from './movies/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: MoviesReducer,
  },
});
