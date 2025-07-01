// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
// Não importamos mais mockRecipes, pois usaremos a API
// import { Recipe, mockRecipes } from './types/Recipe'; // Removido
import { extractIngredients, parseInstructions } from './utils/recipeParsers'; // Importa funções auxiliares

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]); // Usaremos 'recipes' para a lista de resultados da busca
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedRecipeDetails, setSelectedRecipeDetails] = useState(null); // Estado para detalhes completos da receita
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Efeito para buscar receitas quando o termo de busca muda
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null); // Limpa erros anteriores
      setRecipes([]); // Limpa receitas anteriores

      // Se o termo de busca estiver vazio, não faz a requisição
      if (!searchTerm) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // A API retorna 'meals' ou null se não houver resultados
        setRecipes(data.meals || []);
      } catch (e) {
        setError("Falha ao buscar receitas. Tente novamente mais tarde.");
        console.error("Erro ao buscar receitas:", e);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchRecipes();
    }, 500); // Debounce para evitar muitas requisições ao digitar

    return () => clearTimeout(debounceFetch); // Limpa o timeout se o componente for desmontado ou searchTerm mudar
  }, [searchTerm]);

  // Efeito para buscar detalhes de uma receita específica quando selectedRecipeId muda
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!selectedRecipeId) {
        setSelectedRecipeDetails(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedRecipeId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // A API retorna 'meals' como um array com um único item para detalhes
        setSelectedRecipeDetails(data.meals ? data.meals[0] : null);
      } catch (e) {
        setError("Falha ao carregar detalhes da receita.");
        console.error("Erro ao buscar detalhes da receita:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [selectedRecipeId]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setSelectedRecipeId(null); // Limpa a seleção de detalhes ao fazer nova busca
  };

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  const handleBackToList = () => {
    setSelectedRecipeId(null);
    setSelectedRecipeDetails(null); // Limpa os detalhes ao voltar para a lista
  };

  // Renderização condicional do conteúdo principal
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="message-container">
          <p className="message-text">Carregando receitas...</p>
          <div className="loader"></div> {/* Adicione um loader CSS em App.css */}
        </div>
      );
    }

    if (error) {
      return (
        <div className="message-container">
          <p className="message-text error-message">{error}</p>
          <button className="back-button" onClick={() => setError(null)}>Tentar Novamente</button>
        </div>
      );
    }

    if (selectedRecipeId) {
      if (!selectedRecipeDetails) {
        return (
          <div className="message-container">
            <p className="message-text">Detalhes da receita não encontrados.</p>
            <button className="back-button" onClick={handleBackToList}>Voltar para a Lista</button>
          </div>
        );
      }
      // Se tivermos os detalhes, renderizamos
      const ingredients = extractIngredients(selectedRecipeDetails);
      const instructions = parseInstructions(selectedRecipeDetails.strInstructions);

      return (
        <div className="recipe-detail-container">
          <button className="back-button" onClick={handleBackToList}>Voltar para a Lista</button>
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
