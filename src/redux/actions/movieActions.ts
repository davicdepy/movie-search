export type MovieSummary = {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
  };

  export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

  export const setSearchResults = (results: MovieSummary[]) => ({
    type: SET_SEARCH_RESULTS,
    payload: results,
  });