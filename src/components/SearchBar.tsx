import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface SearchBarProps {
  setSearchTerm: (searchTerm: string) => void;
  setYear: (year: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm, setYear }) => {
  const [term, setTerm] = useState("");
  const [yearInput, setYearInput] = useState("");

  const handleSearch = () => {
    setSearchTerm(term);
    setYear(yearInput);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        p: 3,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        Buscador de Películas
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onKeyPress={handleKeyPress}
      >
        <TextField
          label="Título"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <TextField
          label="Año"
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
