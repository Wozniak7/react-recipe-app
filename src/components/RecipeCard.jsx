// src/components/RecipeCard.jsx
import React from 'react';
// import { Recipe } from '../types/Recipe'; // Removido import da interface Recipe
import './RecipeCard.css'; // Estilos específicos para o card

const RecipeCard = ({ recipe, onClick }) => { // Removido <RecipeCardProps>
    return (
        <div className="recipe-card" onClick={() => onClick(recipe.id)}>
            <img src={recipe.imageUrl} alt={recipe.title} className="recipe-card-image" />
            <div className="recipe-card-content">
                <h3 className="recipe-card-title">{recipe.title}</h3>
                <p className="recipe-card-description">{recipe.description}</p>
                <div className="recipe-card-details">
                    {recipe.prepTimeMinutes && (
                        <span className="recipe-card-detail-item">
                            🕒 {recipe.prepTimeMinutes} min (Preparo)
                        </span>
                    )}
                    {recipe.cookTimeMinutes && (
                        <span className="recipe-card-detail-item">
                            🔥 {recipe.cookTimeMinutes} min (Cozimento)
                        </span>
                    )}
                    {recipe.servings && (
                        <span className="recipe-card-detail-item">
                            🍽️ {recipe.servings} Porções
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
