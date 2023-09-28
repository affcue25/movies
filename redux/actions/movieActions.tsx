import { createAction } from '@reduxjs/toolkit';

// Define action types
export const addMovie = createAction<{ title: string; overview: string; releaseDate: string; rating: number, posterPath: string }>('ADD_MOVIE');
export const addToFavorites = createAction<number>('ADD_TO_FAVORITES');
export const removeFromFavorites = createAction<number>('REMOVE_FROM_FAVORITES');