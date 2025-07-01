// src/types/Recipe.js
// Define a estrutura de dados esperada para uma receita e seus ingredientes da API TheMealDB.

/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {string} measure
 */

/**
 * @typedef {Object} Recipe
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

/**
 * @typedef {Object} MealDetail
 * @property {string} idMeal
 * @property {string} strMeal
 * @property {string} strCategory
 * @property {string} strArea
 * @property {string} strInstructions
 * @property {string} strMealThumb
 * @property {string} strYoutube
 * @property {string} strSource
 * @property {string} strTags
 * @property {string} strCreativeCommonsConfirmed
 * @property {string} strDrinkAlternate
 * @property {string} strImageSource
 * @property {string} strIngredient1
 * @property {string} strIngredient2
 * @property {string} strIngredient3
 * @property {string} strIngredient4
 * @property {string} strIngredient5
 * @property {string} strIngredient6
 * @property {string} strIngredient7
 * @property {string} strIngredient8
 * @property {string} strIngredient9
 * @property {string} strIngredient10
 * @property {string} strIngredient11
 * @property {string} strIngredient12
 * @property {string} strIngredient13
 * @property {string} strIngredient14
 * @property {string} strIngredient15
 * @property {string} strIngredient16
 * @property {string} strIngredient17
 * @property {string} strIngredient18
 * @property {string} strIngredient19
 * @property {string} strIngredient20
 * @property {string} strMeasure1
 * @property {string} strMeasure2
 * @property {string} strMeasure3
 * @property {string} strMeasure4
 * @property {string} strMeasure5
 * @property {string} strMeasure6
 * @property {string} strMeasure7
 * @property {string} strMeasure8
 * @property {string} strMeasure9
 * @property {string} strMeasure10
 * @property {string} strMeasure11
 * @property {string} strMeasure12
 * @property {string} strMeasure13
 * @property {string} strMeasure14
 * @property {string} strMeasure15
 * @property {string} strMeasure16
 * @property {string} strMeasure17
 * @property {string} strMeasure18
 * @property {string} strMeasure19
 * @property {string} strMeasure20
 * @property {string} strSource
 * @property {string} strImageSource
 * @property {string} strCreativeCommonsConfirmed
 * @property {string} dateModified
 */

