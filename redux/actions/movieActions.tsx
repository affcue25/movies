import { createAction } from '@reduxjs/toolkit';

// Define action types
export const addMovie = createAction<{ title: string; overview: string; releaseDate: string; rating: number, posterPath: string }>('ADD_MOVIE');
export const addToFavorites = createAction<{ title: string; overview: string; releaseDate: string; rating: number, posterPath: string }>('ADD_TO_FAVORITES');
export const removeFromFavorites = createAction<{ title: string; overview: string; releaseDate: string; rating: number, posterPath: string }>('REMOVE_FROM_FAVORITES');