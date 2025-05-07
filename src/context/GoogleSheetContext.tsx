"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface GoogleSheetContextType {
  data: string[][];
  filteredData: string[][];
  error: string | null;
  setFilter: (filter: string) => void;
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
  const [filteredData, setFilteredData] = useState<string[][]>([]); // Inicialmente vacío
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        const csvText = await response.text();

        // Parsear el CSV
        const rows = csvText.split("\n").map((row) => row.split(","));
        setData(rows.slice(1)); // Excluir la fila de encabezados
      } catch (err) {
        setError("Error fetching Google Sheet data");
        console.error(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (filter) {
      const words = filter.toLowerCase().split(" "); // Dividir el término de búsqueda en palabras
      setFilteredData(
        data.filter((row) =>
          words.every((word) =>
            row.some((cell) => cell.toLowerCase().includes(word))
          )
        )
      );
    } else {
      setFilteredData([]); // Si no hay filtro, no mostrar datos
    }
  }, [filter, data]);

  return (
    <GoogleSheetContext.Provider
      value={{ data, filteredData, error, setFilter }}
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