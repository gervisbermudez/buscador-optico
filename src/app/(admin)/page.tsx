"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import { useGoogleSheetContext } from "@/context/GoogleSheetContext";
import CardViewOne from "@/components/cards/CardViewOne";

export default function Ecommerce() {
  const { data, filteredData, error, toggleFilter, filters, searchTerm } =
    useGoogleSheetContext();

  if (error) {
    return <div>Error: {error}</div>;
  }

  const showResults = filters.length > 0 || searchTerm.trim() !== "";

  return (
    <div>
      {filteredData.length > 0 && (
        <PageBreadcrumb pageTitle="Elige uno" />
      )}

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Array.from(new Set(data.map((row) => row[0]))).map((name, index) => (
          <button
            key={index}
            onClick={() => toggleFilter(name)}
            className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${
              filters.includes(name)
                ? "bg-blue-500 text-white"
                : "bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-200"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {showResults ? (
          filteredData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <p>No se encontraron resultados.</p>
            </div>
          ) : (
            <ComponentCard title={`Resultados de búsqueda: ${filteredData.length}`}>
              <CardViewOne />
            </ComponentCard>
          )
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <p>
              Presiona{" "}
              <kbd className="font-mono text-sm bg-gray-200 px-1.5 py-0.5 rounded dark:bg-gray-700">
                Ctrl
              </kbd>{" "}
              +{" "}
              <kbd className="font-mono text-sm bg-gray-200 px-1.5 py-0.5 rounded dark:bg-gray-700">
                K
              </kbd>{" "}
              para buscar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
