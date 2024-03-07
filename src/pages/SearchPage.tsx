import React, { useState } from "react";
import MovieList from "./MovieList";
import SearchBar from "../components/SearchBar";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} setYear={setYear} />
      <MovieList searchTerm={searchTerm} year={year} />
    </div>
  );
};

export default SearchPage;
