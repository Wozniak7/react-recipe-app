// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css'; // Estilos globais para o App
import SearchBar from './components/SearchBar'; // Importa o componente SearchBar
import RecipeCard from './components/RecipeCard'; // Importa o componente RecipeCard
import { mockRecipes } from './types/Recipe'; // Importa apenas os dados mockados

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Estado para as receitas filtradas (sem tipo explícito)
  const [selectedRecipeId, setSelectedRecipeId] = useState(null); // Estado para a receita selecionada (para detalhes)

  // useEffect para simular a busca de receitas quando o termo de busca muda
  useEffect(() => {
    // Simula uma chamada de API
    const fetchRecipes = () => {
      let results = mockRecipes;

      if (searchTerm) {
        results = mockRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredRecipes(results);
    };

    fetchRecipes();
  }, [searchTerm]); // Dependência: executa quando searchTerm muda

  // Função para lidar com a busca
  const handleSearch = (query) => {
    setSearchTerm(query);
    setSelectedRecipeId(null); // Limpa a seleção de detalhes ao buscar
  };

  // Função para lidar com o clique no card de receita
  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  // Função para voltar para a lista de receitas
  const handleBackToList = () => {
    setSelectedRecipeId(null);
  };

  // Renderização condicional: exibe detalhes da receita ou a lista
  const renderContent = () => {
    if (selectedRecipeId) {
      const selectedRecipe = filteredRecipes.find(r => r.id === selectedRecipeId);
      if (!selectedRecipe) {
        return (
          <div className="message-container">
            <p className="message-text error-message">Receita não encontrada.</p>
            <button className="back-button" onClick={handleBackToList}>Voltar para a Lista</button>
          </div>
        );
      }
      return (
        <div className="recipe-detail-container">
          <button className="back-button" onClick={handleBackToList}>Voltar para a Lista</button>
          <h2 className="detail-title">{selectedRecipe.title}</h2>
          <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} className="detail-image" />
          <p className="detail-description">{selectedRecipe.description}</p>

          <h3 className="section-title">Ingredientes:</h3>
          <ul className="ingredient-list">
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient.name} ({ingredient.quantity} {ingredient.unit})
              </li>
            ))}
          </ul>

          <h3 className="section-title">Instruções:</h3>
          <ol className="instruction-list">
            {selectedRecipe.instructions.map((instruction, index) => (
              <li key={index} className="instruction-item">{instruction}</li>
            ))}
          </ol>

          <div className="detail-meta">
            {selectedRecipe.prepTimeMinutes && <span className="meta-item">🕒 Preparo: {selectedRecipe.prepTimeMinutes} min</span>}
            {selectedRecipe.cookTimeMinutes && <span className="meta-item">🔥 Cozimento: {selectedRecipe.cookTimeMinutes} min</span>}
            {selectedRecipe.servings && <span className="meta-item">🍽️ Porções: {selectedRecipe.servings}</span>}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <SearchBar onSearch={handleSearch} />
          <div className="recipe-list-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
              ))
            ) : (
              <p className="message-text">Nenhuma receita encontrada para "{searchTerm}".</p>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-main-title">Buscador de Receitas 🍳</h1>
      {renderContent()}
    </div>
  );
}

export default App;
