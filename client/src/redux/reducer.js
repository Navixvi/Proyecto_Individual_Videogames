import { SET_SEARCH_RESULTS } from './actions-types';

const paginationInitialState = {
  currentPage: 1,
  totalPages: 7,
  pageSize: 15,
};

export const paginationReducer = (state = paginationInitialState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.page,
      };

    default:
      return state;
  }
};

const searchInitialState = {
  searchResults: [], 
};

const searchReducer = (state = searchInitialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults,
      };
  
    default:
      return state;
  }
};

export default searchReducer;
