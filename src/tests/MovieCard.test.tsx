import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "../components/MovieCard";

describe("MovieCard Component", () => {
  const movie = {
    Title: "Matrix",
    Year: "1999",
    imdbID: "tt0133093",
    Poster: "http://example.com/matrix.jpg",
    Type: "movie",
  };

  test("renders MovieCard component with movie data", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={movie} />
      </BrowserRouter>
    );

    expect(screen.getByText("Matrix")).toBeInTheDocument();
    expect(screen.getByText("1999")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", movie.Poster);
  });

  test("navigates when card is clicked", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={movie} />
      </BrowserRouter>
    );

    const cardActionArea = screen.getByRole("button");
    fireEvent.click(cardActionArea);
  });
});
