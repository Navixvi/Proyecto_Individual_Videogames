import { SET_PAGE, SET_SELECTED_GENRE } from './actions-types';

export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});

export const setSearchResults = (searchResults) => ({
  type: 'SET_SEARCH_RESULTS',
  searchResults,
});

export const setSelectedGenre = (genreId) => ({
  type: SET_SELECTED_GENRE,
  payload: genreId,
});
