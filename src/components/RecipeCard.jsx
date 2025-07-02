// src/components/RecipeCard.jsx
import React from 'react';
import './RecipeCard.css';
import useRecipeStore from '../store/useRecipeStore'; // Importa o store Zustand

const RecipeCard = ({ recipe }) => { // A prop onClick foi removida
    // Obtém a ação setSelectedRecipeId do store Zustand
    const setSelectedRecipeId = useRecipeStore((state) => state.setSelectedRecipeId);

    return (
        <div className="recipe-card" onClick={() => setSelectedRecipeId(recipe.idMeal)}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-card-image" />
            <div className="recipe-card-content">
                <h3 className="recipe-card-title">{recipe.strMeal}</h3>
                <p className="recipe-card-description">{recipe.strCategory} - {recipe.strArea}</p>
                <div className="recipe-card-details">
                    {/* Detalhes como tempo de preparo e porções não vêm na busca por nome, apenas nos detalhes */}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
