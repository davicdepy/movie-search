import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Box, Container } from "@mui/material";
import { fetchMovieById, MovieDetails } from "./../service/api";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieDetails = await fetchMovieById(id!);
        setMovie(movieDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return <Typography variant="h5">Movie not found.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        {movie.Title} ({movie.Year})
      </Typography>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} my={4}>
        <Box flexShrink={0} mb={{ xs: 2, md: 0 }} mr={{ md: 4 }}>
          <img
            src={movie.Poster}
            alt={movie.Title}
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </Box>
        <Box flexGrow={1}>
          <Typography variant="h6" gutterBottom>
            Plot
          </Typography>
          <Typography paragraph>{movie.Plot}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Director: {movie.Director}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Writer: {movie.Writer}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Actors: {movie.Actors}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Genre: {movie.Genre}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Released: {movie.Released}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Rated: {movie.Rated}
          </Typography>
          {/* Add more details as needed */}
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetail;
