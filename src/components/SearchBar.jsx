// src/components/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';
import useRecipeStore from '../store/useRecipeStore'; // Importa o store Zustand

const SearchBar = () => {
    // Obtém a ação setSearchTerm do store Zustand
    const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
    const currentSearchTerm = useRecipeStore((state) => state.searchTerm); // Opcional: para manter o input sincronizado

    const [query, setQuery] = useState(currentSearchTerm); // Inicializa o estado local com o termo do store

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = () => {
        setSearchTerm(query); // Chama a ação do store
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setSearchTerm(query); // Chama a ação do store
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder="Buscar receitas..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearchClick}>
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;
