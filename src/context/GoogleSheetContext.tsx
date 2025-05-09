"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface GoogleSheetContextType {
  data: string[][];
  filteredData: string[][];
  error: string | null;
  filters: string[];
  searchTerm: string;
  suggestions: string[]; // Nuevo array de sugerencias
  toggleFilter: (filter: string) => void;
  setSearchTerm: (term: string) => void;
}

const GoogleSheetContext = createContext<GoogleSheetContextType | undefined>(
  undefined
);

const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1YWeC3xAP8uN5JQvHT1cgJjGzvNBo4zPNARjIpUary84/export?format=csv&gid=0";

export const GoogleSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<string[][]>([]);
  const [filteredData, setFilteredData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]); // Nuevo estado para sugerencias

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        const csvText = await response.text();

        // Parsear el CSV
        const rows = csvText.split("\n").map((row) => row.split(","));
        setData(rows.slice(1)); // Excluir la fila de encabezados

        // Generar sugerencias únicas
        const allWords = rows
          .slice(1) // Excluir encabezados
          .flat() // Aplanar el array
          .map((cell) => cell.toLowerCase().match(/\b[a-zA-Z]+\b/g)) // Extraer solo palabras
          .flat() // Aplanar nuevamente
          .filter((word) => word && !isStopWord(word)) // Filtrar palabras vacías y stop words

        setSuggestions(Array.from(new Set(allWords.filter((word): word is string => word !== null)))); // Eliminar duplicados y filtrar nulos
      } catch (err) {
        setError("Error fetching Google Sheet data");
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const isStopWord = (word: string): boolean => {
    const stopWords = [
      "el",
      "la",
      "los",
      "las",
      "un",
      "una",
      "unos",
      "unas",
      "y",
      "o",
      "de",
      "a",
      "en",
      "con",
      "por",
      "para",
      "que",
      "es",
      "al",
      "del",
    ];
    return stopWords.includes(word);
  };

  useEffect(() => {
    const searchWords = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((word) => word.trim() !== "");

    if (filters.length > 0 || searchWords.length > 0) {
      setFilteredData(
        data.filter((row) => {
          const matchesFilters =
            filters.length === 0 ||
            filters.some((filter) =>
              row.some((cell) => cell.includes(filter))
            );
          const matchesSearch =
            searchWords.length === 0 ||
            searchWords.some((word) =>
              row.some((cell) => cell.toLowerCase().includes(word))
            );
          return matchesFilters && matchesSearch;
        })
      );
    } else {
      setFilteredData([]);
    }
  }, [filters, searchTerm, data]);

  const toggleFilter = (filter: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <GoogleSheetContext.Provider
      value={{
        data,
        filteredData,
        error,
        filters,
        searchTerm,
        suggestions, // Exponer sugerencias
        toggleFilter,
        setSearchTerm,
      }}
    >
      {children}
    </GoogleSheetContext.Provider>
  );
};

export const useGoogleSheetContext = () => {
  const context = useContext(GoogleSheetContext);
  if (!context) {
    throw new Error(
      "useGoogleSheetContext must be used within a GoogleSheetProvider"
    );
  }
  return context;
};