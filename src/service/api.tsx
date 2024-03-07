import axios, { AxiosInstance, AxiosResponse } from "axios";

interface MovieSearchResult {
  Search: MovieSummary[];
  totalResults: string;
  Response: string;
  Error?: string;
}

interface MovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
}

const apiKey: string = process.env.REACT_APP_OMDB_API_KEY || "";

const api: AxiosInstance = axios.create({
  baseURL: "https://www.omdbapi.com/",
  params: {
    apiKey,
  },
});

export const fetchMovies = async (
  title: string,
  year: string
): Promise<MovieSearchResult> => {
  try {
    const response: AxiosResponse<MovieSearchResult> = await api.get("", {
      params: { s: title, y: year },
    });
    if (response.data.Response === "True") {
      return response.data;
    } else {
      throw new Error(response.data.Error);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieById = async (imdbID: string): Promise<MovieDetails> => {
  try {
    const response: AxiosResponse<MovieDetails> = await api.get("", {
      params: { i: imdbID, plot: "full" },
    });
    if (response.data.Response === "True") {
      return response.data;
    } else {
      throw new Error(response.data.Error);
    }
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
};