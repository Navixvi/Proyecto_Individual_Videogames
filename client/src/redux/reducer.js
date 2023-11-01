// reducers/paginationReducer.js
const initialState = {
    currentPage: 1,
    totalPages: 1,
    pageSize: 15, // Cantidad de videojuegos por página
  };
  
  export const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PAGE':
        return {
          ...state,
          currentPage: action.page,
        };
      case 'SET_TOTAL_PAGES':
        return {
          ...state,
          totalPages: action.totalPages,
        };
      default:
        return state;
    }
  };
  