import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MovieApi from '../../common/apis/MovieApi';
import { APIKEY } from '../../common/apis/MovieApiKey';

const initialState = {
  movies: [],
};

export const fetchAsyncMovies = createAsyncThunk(
  'Movies/fetchAsyncMovies',
  async () => {
    const movieText = 'Harry';
    const response = await MovieApi.get(
      `?apiKey=${APIKEY}&s=${movieText}&type=movie`
    ).catch((err) => {
      console.log(err);
    });
    return response.data;
  }
);

const MovieSlice = createSlice({
  name: 'Movies',
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state, { payload }) => {
        console.log('Pending...');
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, (state, { payload }) => {
        console.log('rejected');
      });
  },
});

export const { addMovies } = MovieSlice.actions;
// state.[reducer].[property].
export const getAllMovies = (state) => state.movies.movies;

export default MovieSlice.reducer;
