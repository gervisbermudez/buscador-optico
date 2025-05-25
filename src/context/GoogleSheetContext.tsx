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
  setNumericFilters: (filters: { esf: string; cil: string; add: string }) => void; // Nueva función para actualizar valores numéricos
  isFilterActive: boolean; // Nuevo estado para controlar el botón de filtro
  setIsFilterActive: (active: boolean) => void; // Nueva función para actualizar el estado del botón de filtro
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
  const [numericFilters, setNumericFilters] = useState({
    esf: "",
    cil: "",
    add: "",
  }); // Estado para los filtros numéricos
  const [isFilterActive, setIsFilterActive] = useState(false); // Nuevo estado para controlar el botón de filtro

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
          // Filtrar palabras vacías, stop words y palabras con más de 1 letra
          .filter((word) => word && word.length > 1 && !isStopWord(word))
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

    setFilteredData(
      data
        .filter((row) => {
          if (isFilterActive && numericFilters.add !== "") { 
            const addValue = parseFloat(numericFilters.add);
            const addMin = parseFloat(row[14]);
            const addMax = parseFloat(row[15]);
            // Si addMin y addMax son NaN, no se aplica el filtro
            if (addValue && !isNaN(addMin) && !isNaN(addMax)) {
              if (addValue >= addMin && addValue <= addMax) {
                return true;
              }
            }
            return false; // Si no se aplica el filtro, se devuelve false
          }
          return true;
        }
      ).filter((row, index) => {
          
        console.log({
          row,
          index,
          filters,
          searchWords,
          isFilterActive,
          numericFilters,
        });
        

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
  }, [filters, searchTerm, numericFilters.add, isFilterActive, data]);

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
        suggestions,
        toggleFilter,
        setSearchTerm,
        setNumericFilters,
        isFilterActive, // Exponer el estado
        setIsFilterActive, // Exponer la función para actualizar el estado
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