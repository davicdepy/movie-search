import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
    Type?: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <Card sx={{ maxWidth: 600, m: 2, boxShadow: 3 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="600"
          image={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/345x140?text=No+Image"
          }
          alt={movie.Title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.Title}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              {movie.Year}
            </Typography>
            {movie.Type && (
              <Typography variant="body2" color="text.secondary">
                {movie.Type}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
