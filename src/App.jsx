// src/App.jsx
import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import useRecipeStore from './store/useRecipeStore'; // Importa o store Zustand
import { extractIngredients, parseInstructions } from './utils/recipeParsers';

function App() {
  // Acessa o estado e as ações do store Zustand
  const {
    searchTerm,
    recipes,
    selectedRecipeId,
    selectedRecipeDetails,
    isLoading,
    error,
    setSearchTerm,
    setSelectedRecipeId,
    clearError,
    backToList,
  } = useRecipeStore();

  // Função para lidar com a busca (agora apenas chama a ação do store)
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // Função para lidar com o clique no card de receita (chama a ação do store)
  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  // Renderização condicional do conteúdo principal
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="message-container">
          <p className="message-text">Carregando receitas...</p>
          <div className="loader"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="message-container">
          <p className="message-text error-message">{error}</p>
          <button className="back-button" onClick={clearError}>Tentar Novamente</button>
        </div>
      );
    }

    if (selectedRecipeId) {
      if (!selectedRecipeDetails) {
        // Isso pode acontecer se a requisição de detalhes falhou ou ainda está carregando
        return (
          <div className="message-container">
            <p className="message-text">Detalhes da receita não encontrados.</p>
            <button className="back-button" onClick={backToList}>Voltar para a Lista</button>
          </div>
        );
      }
      // Se tivermos os detalhes, renderizamos
      const ingredients = extractIngredients(selectedRecipeDetails);
      const instructions = parseInstructions(selectedRecipeDetails.strInstructions);

      return (
        <div className="recipe-detail-container">
          <button className="back-button" onClick={backToList}>Voltar para a Lista</button>
          <h2 className="detail-title">{selectedRecipeDetails.strMeal}</h2>
          <img src={selectedRecipeDetails.strMealThumb} alt={selectedRecipeDetails.strMeal} className="detail-image" />
          <p className="detail-description">{selectedRecipeDetails.strInstructions}</p>

          <h3 className="section-title">Ingredientes:</h3>
          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient.name} ({ingredient.measure})
              </li>
            ))}
          </ul>

          <h3 className="section-title">Instruções:</h3>
          <ol className="instruction-list">
            {instructions.map((instruction, index) => (
              <li key={index} className="instruction-item">{instruction}</li>
            ))}
          </ol>

          <div className="detail-meta">
            {selectedRecipeDetails.strCategory && <span className="meta-item">Categoria: {selectedRecipeDetails.strCategory}</span>}
            {selectedRecipeDetails.strArea && <span className="meta-item">Origem: {selectedRecipeDetails.strArea}</span>}
            {selectedRecipeDetails.strYoutube && (
              <a href={selectedRecipeDetails.strYoutube} target="_blank" rel="noopener noreferrer" className="meta-item youtube-link">
                ▶️ Ver no YouTube
              </a>
            )}
            {selectedRecipeDetails.strSource && (
              <a href={selectedRecipeDetails.strSource} target="_blank" rel="noopener noreferrer" className="meta-item source-link">
                🔗 Fonte Original
              </a>
            )}
          </div>
        </div>
      );
    } else {
      // Exibe a barra de busca e a lista de resultados
      return (
        <>
          <SearchBar onSearch={handleSearch} />
          {recipes.length > 0 ? (
            <div className="recipe-list-grid">
              {recipes.map(recipe => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onClick={handleRecipeClick}
                />
              ))}
            </div>
          ) : (
            searchTerm && <p className="message-text">Nenhuma receita encontrada para "{searchTerm}".</p>
          )}
          {!searchTerm && !isLoading && !error && (
            <div className="initial-message-container">
              <p className="message-text initial-message">Digite o nome de uma receita para começar a buscar!</p>
            </div>
          )}
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
