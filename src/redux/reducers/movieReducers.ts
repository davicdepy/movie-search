import { SET_SEARCH_RESULTS } from './../actions/movieActions';

const initialState = {
  searchResults: [],
};

const movieReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;