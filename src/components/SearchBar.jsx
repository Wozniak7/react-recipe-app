// src/components/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css'; // Estilos específicos para a barra de busca

const SearchBar = ({ onSearch }) => { // Removido <SearchBarProps>
    const [query, setQuery] = useState(''); // Estado para o valor do input de busca

    const handleInputChange = (event) => { // Removido tipo de evento
        setQuery(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(query); // Chama a função onSearch passada via props
    };

    const handleKeyPress = (event) => { // Removido tipo de evento
        if (event.key === 'Enter') {
            onSearch(query); // Pesquisa ao pressionar Enter
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder="Buscar receitas... (ex: chicken, pasta, etc.)"
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
