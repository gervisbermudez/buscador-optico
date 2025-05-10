"use client";

import React, { useState, useEffect } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import { useGoogleSheetContext } from "@/context/GoogleSheetContext";
import CardViewOne from "@/components/cards/CardViewOne";

export default function Ecommerce() {
  const {
    data,
    filteredData,
    error,
    toggleFilter,
    filters,
    searchTerm,
    setNumericFilters,
    isFilterActive// Nueva función para actualizar valores numéricos en el contexto
  } = useGoogleSheetContext();

// Estado para mostrar/ocultar filtros adicionales
  const [numericFilters, setLocalNumericFilters] = useState({
    esf: "",
    cil: "",
    add: "",
  }); // Estado local para los inputs numéricos

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalNumericFilters((prev) => ({ ...prev, [name]: value }));
    setNumericFilters({ ...numericFilters, [name]: value }); // Actualiza el contexto global
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const showResults = filters.length > 0 || searchTerm.trim() !== "";

  return (
    <div>
      {filteredData.length > 0 && <PageBreadcrumb pageTitle="Elige uno" />}

      {/* Filtros principales */}
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

      {/* Contenedor de filtros adicionales */}
      {isFilterActive && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex flex-col items-center">
            <label
              htmlFor="esf"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Esfera (ESF)
            </label>
            <div className="relative">
              <input
                type="number"
                id="esf"
                name="esf"
                value={numericFilters.esf}
                onChange={handleInputChange}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor="cil"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Cilindro (CIL)
            </label>
            <div className="relative">
              <input
                type="number"
                id="cil"
                name="cil"
                value={numericFilters.cil}
                onChange={handleInputChange}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor="add"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Adición (ADD)
            </label>
            <div className="relative">
              <input
                type="number"
                id="add"
                name="add"
                value={numericFilters.add}
                onChange={handleInputChange}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
              />
            </div>
          </div>
        </div>
      )}

      {/* Resultados */}
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
