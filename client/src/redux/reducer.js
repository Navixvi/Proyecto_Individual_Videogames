
const initialState = {
    currentPage: 1,
    totalPages: 7,
    pageSize: 15, 
  };
  
  export const paginationReducer = (state = initialState, action) => {
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
  