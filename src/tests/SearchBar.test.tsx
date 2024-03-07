import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
test("renders SearchBar component and allows typing", () => {
    const setSearchTerm = jest.fn();
    const setYear = jest.fn();

    render(<SearchBar setSearchTerm={setSearchTerm} setYear={setYear} />);

    const inputTitle = screen.getByLabelText(/título/i) as HTMLInputElement;
    const inputYear = screen.getByLabelText(/año/i) as HTMLInputElement;

    fireEvent.change(inputTitle, { target: { value: "Matrix" } });
    fireEvent.change(inputYear, { target: { value: "1999" } });

    expect(inputTitle.value).toBe("Matrix");
    expect(inputYear.value).toBe("1999");
});

  test("calls setSearchTerm and setYear when search button is clicked", () => {
    const setSearchTerm = jest.fn();
    const setYear = jest.fn();

    render(<SearchBar setSearchTerm={setSearchTerm} setYear={setYear} />);

    const button = screen.getByRole("button", { name: /buscar/i });

    fireEvent.click(button);

    expect(setSearchTerm).toHaveBeenCalledTimes(1);
    expect(setYear).toHaveBeenCalledTimes(1);
  });
});
