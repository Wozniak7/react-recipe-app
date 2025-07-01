// src/components/RecipeCard.jsx
import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
    return (
        <div className="recipe-card" onClick={() => onClick(recipe.idMeal)}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-card-image" />
            <div className="recipe-card-content">
                <h3 className="recipe-card-title">{recipe.strMeal}</h3>
                <p className="recipe-card-description">{recipe.strCategory} - {recipe.strArea}</p> {/* Exibe categoria e área */}
                {/* Detalhes como tempo de preparo e porções não vêm na busca por nome, apenas nos detalhes */}
                <div className="recipe-card-details">
                    {/* Podemos adicionar tags ou outras informações aqui se a API de busca por nome as fornecer */}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
