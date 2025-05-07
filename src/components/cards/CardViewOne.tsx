"use client";

import React from "react";
import { useGoogleSheetContext } from "../../context/GoogleSheetContext";

export default function CardViewOne() {
  const { filteredData, error } = useGoogleSheetContext();

  if (error) {
    return <div>Error: {error}</div>;
  }

  const headers = [
    "SERIE",
    "TIPO",
    "SUBTIPO",
    "MATERIAL",
    "TRATAMIENTO",
    "NOMBRE",
    "PRECIO BASE",
    "PRECIO SUGERIDO",
    "MULTIPLICADOR",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredData.map((row, index) => (
        <div
          key={index}
          className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
        >
          {/* Título con el nombre */}
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {row[5] /* NOMBRE */}
          </h3>

          {/* Precio de Lista */}
          <div className="flex flex-col items-baseline text-gray-900 dark:text-white mb-4">
            <span className="text-xl font-semibold">Precio de Lista:</span>
            <span className="text-2xl font-bold ms-2">${row[6] /* PRECIO BASE */}</span>
          </div>



          {/* Lista de detalles (sin incluir SERIE, TIPO, SUBTIPO, MULTIPLICADOR, NOMBRE, PRECIO BASE y PRECIO SUGERIDO) */}
          <ul role="list" className="space-y-3 mb-6">
            {headers.map((header, headerIndex) => {
              // Ignorar las columnas "SERIE" (0), "TIPO" (1), "SUBTIPO" (2), "MULTIPLICADOR" (8), "NOMBRE" (5), "PRECIO BASE" (6) y "PRECIO SUGERIDO" (7)
              if ([0, 1, 2, 5, 6, 7, 8].includes(headerIndex)) return null;

              return (
                <li key={headerIndex} className="flex items-center">
                  <svg
                    className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                    />
                  </svg>
                  <span className="text-sm font-normal leading-tight text-gray-600 dark:text-gray-400 ms-3">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {header}:
                    </span>{" "}
                    {row[headerIndex]}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Chips para SERIE, TIPO y SUBTIPO */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[0, 1, 2].map((chipIndex) => (
              <span
                key={chipIndex}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {row[chipIndex]}
              </span>
            ))}
              </div>
              
        {/* Precio sugerido */}
        <div className="mt-5 flex flex-col items-baseline text-green-600 dark:text-green-400 mb-4">
            <span className="text-xl font-semibold">Precio sugerido:</span>
            <span className="text-2xl font-bold ms-2">${row[8] /* PRECIO SUGERIDO */}</span>
          </div>
        </div>
      ))}
    </div>
  );
}