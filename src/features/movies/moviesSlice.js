import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MovieApi from '../../common/apis/MovieApi';
import { APIKEY } from '../../common/apis/MovieApiKey';

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

export const fetchAsyncMovies = createAsyncThunk(
  'Movies/fetchAsyncMovies',
  async (term) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKEY}&s=${term}&type=movie`
    ).catch((err) => {
      console.log(err);
    });
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  'Movies/fetchAsyncShows',
  async (term) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKEY}&s=${term}&type=series`
    ).catch((err) => {
      console.log(err);
    });
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'Movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKEY}&i=${id}&Plot=full`
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
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
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
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        return { ...state, shows: payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        return { ...state, selectedMovieOrShow: payload };
      });
  },
});

export const { addMovies, removeSelectedMovieOrShow } = MovieSlice.actions;
// state.[reducer].[property].
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;

export default MovieSlice.reducer;
