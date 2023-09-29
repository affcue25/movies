import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { addMovie, addToFavorites, removeFromFavorites } from '../actions/movieActions';

// Initial state
interface Movie {
  title: string;
  overview: string;
  releaseDate: string;
  rating: number;
}

interface MovieState {
  movies: Movie[];
  favorites: Movie[]; // Storing movie IDs as favorites
}

const initialState: MovieState = {
  movies: [],
  favorites: [],
};

// Create reducers
const movieReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMovie, (state, action: PayloadAction<Movie>) => {
      // Add the new movie to the state
      state.movies.push(action.payload);
    })
    .addCase(addToFavorites, (state, action: PayloadAction<Movie>) => {
      // Add movie to favorites
      state.favorites.push(action.payload);
    })
    .addCase(removeFromFavorites, (state, action: PayloadAction<Movie>) => {
      // Remove movie from favorites
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    });
});

export default movieReducer;
