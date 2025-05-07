"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import { useGoogleSheetContext } from "@/context/GoogleSheetContext";
import CardViewOne from "@/components/cards/CardViewOne";

export default function Ecommerce() {
  const { filteredData, error } = useGoogleSheetContext();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {filteredData.length > 0 && (
        <PageBreadcrumb pageTitle="Elige uno" />)  
      }
      <div className="space-y-6">
        {filteredData.length === 0 ? (
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
        ) : (
          <ComponentCard title="Resultados de búsqueda">
            <CardViewOne />
          </ComponentCard>
        )}
      </div>
    </div>
  );
}
