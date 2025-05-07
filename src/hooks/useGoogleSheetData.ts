import { useEffect, useState } from "react";

export default function useGoogleSheetData(csvUrl: string) {
  const [data, setData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(csvUrl);
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
  }, [csvUrl]);

  return { data, error };
}