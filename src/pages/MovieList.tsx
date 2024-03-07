import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../service/api";

interface MovieListProps {
  searchTerm: string;
  year: string;
}

interface MovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const MovieList: React.FC<MovieListProps> = ({ searchTerm, year }) => {
  const [movies, setMovies] = useState<MovieSummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMovies(searchTerm, year);
        setMovies(result.Search);
        localStorage.setItem("movies", JSON.stringify(result.Search));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm, year]);

  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies && !searchTerm) {
      setMovies(JSON.parse(savedMovies));
    }
  }, [searchTerm]);

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
