// src/types/Recipe.js
// Define a estrutura de dados esperada para uma receita e seus ingredientes da API TheMealDB.

// Usamos JSDoc para documentar a estrutura dos objetos que esperamos da API.

/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {string} measure
 */

/**
 * @typedef {Object} MealDetail
 * @property {string} idMeal - O ID da receita da API.
 * @property {string} strMeal - O nome da receita.
 * @property {string} strCategory - A categoria da receita (ex: "Dessert").
 * @property {string} strArea - A área de origem da receita (ex: "British").
 * @property {string} strInstructions - As instruções de preparo.
 * @property {string} strMealThumb - URL da imagem miniatura da receita.
 * @property {string} strYoutube - URL do vídeo do YouTube (opcional).
 * @property {string} strSource - URL da fonte original (opcional).
 * @property {string} [strIngredient1] - Ingrediente 1 (e assim por diante até 20).
 * @property {string} [strMeasure1] - Medida do Ingrediente 1 (e assim por diante até 20).
 * // ... (outros strIngredientX e strMeasureX até 20)
 */
