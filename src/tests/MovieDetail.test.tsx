import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import * as api from "./../service/api";
import { act } from "react-dom/test-utils";

jest.mock("./../service/api", () => ({
  fetchMovieById: jest.fn(),
}));

describe("MovieDetail Component", () => {
  const mockMovie = {
    Title: "Matrix",
    Year: "1999",
    Poster: "http://example.com/matrix.jpg",
    Plot: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    Director: "The Wachowskis",
    Writer: "The Wachowskis",
    Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    Genre: "Action, Sci-Fi",
    Released: "1999-03-31",
    Rated: "R",
  };

  let originalError: typeof console.error;

  beforeEach(() => {
    originalError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  test("renders loading spinner initially", () => {
    render(
      <MemoryRouter initialEntries={["/movie/tt0133093"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders movie details after fetching", async () => {
    (api.fetchMovieById as jest.Mock).mockResolvedValue(mockMovie);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/movie/tt0133093"]}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Matrix (1999)")).toBeInTheDocument();
    expect(screen.getByText(mockMovie.Plot)).toBeInTheDocument();
    expect(
      screen.getByText(`Director: ${mockMovie.Director}`)
    ).toBeInTheDocument();
  });

  test("renders error message if movie not found", async () => {
    (api.fetchMovieById as jest.Mock).mockRejectedValue(
      new Error("Movie not found")
    );

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/movie/invalid-id"]}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Movie not found.")).toBeInTheDocument();
    });
  });
});
