import { SET_PAGE, } from './actions-types';

export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});

export const setSearchResults = (searchResults) => ({
  type: 'SET_SEARCH_RESULTS',
  searchResults,
});

