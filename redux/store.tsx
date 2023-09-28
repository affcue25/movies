// store.ts

import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movieReducers';

interface YourMovieType {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    rating: number;
    posterPath: string;
  }
// Define the state structure for your entire Redux store
interface RootState {
  movie: {
    movies: YourMovieType[]; // Replace YourMovieType with your actual movie data type
  };
}

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;

// Export RootState for use in other parts of your app
export type { RootState };
