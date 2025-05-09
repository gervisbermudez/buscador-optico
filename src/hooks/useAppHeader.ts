import { useState, useEffect, useRef } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useGoogleSheetContext } from "@/context/GoogleSheetContext";

export const useAppHeader = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { setSearchTerm, suggestions } = useGoogleSheetContext();
  const [searchTerm, setLocalSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Manejar el toggle del sidebar
  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  // Manejar el toggle del menú de la aplicación
  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  // Manejar atajos de teclado (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
    setSearchTerm(value); // Actualizar el término de búsqueda en el contexto

    // Dividir el término de búsqueda en palabras y filtrar por la última palabra
    const words = value.split(" ").filter((word) => word.trim() !== "");
    const lastWord = words[words.length - 1]?.toLowerCase() || "";

    setFilteredSuggestions(
      lastWord
        ? suggestions.filter((suggestion) =>
            suggestion.toLowerCase().startsWith(lastWord)
          )
        : [] // Si no hay texto en la última palabra, no mostrar sugerencias
    );
    setActiveSuggestionIndex(-1); // Reiniciar el índice activo
  };

  // Manejar clic en una sugerencia
  const handleSuggestionClick = (suggestion: string) => {
    const words = searchTerm.split(" ").filter((word) => word.trim() !== "");
    words[words.length - 1] = suggestion; // Reemplazar la última palabra con la sugerencia seleccionada
    const updatedSearchTerm = words.join(" ") + " "; // Agregar un espacio al final
    setLocalSearchTerm(updatedSearchTerm);
    setSearchTerm(updatedSearchTerm); // Actualizar el término de búsqueda con la sugerencia seleccionada
    setFilteredSuggestions([]); // Limpiar las sugerencias
    setActiveSuggestionIndex(-1); // Reiniciar el índice activo
  };

  // Manejar navegación con teclado
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      // Mover hacia abajo en la lista de sugerencias
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      // Mover hacia arriba en la lista de sugerencias
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
      );
    } else if (event.key === "Enter" && activeSuggestionIndex >= 0) {
      // Seleccionar la sugerencia activa
      handleSuggestionClick(filteredSuggestions[activeSuggestionIndex]);
    }
  };

  return {
    isApplicationMenuOpen,
    isMobileOpen,
    searchTerm,
    filteredSuggestions,
    activeSuggestionIndex,
    inputRef,
    handleToggle,
    toggleApplicationMenu,
    handleSearchChange,
    handleSuggestionClick,
    handleKeyDown,
  };
};