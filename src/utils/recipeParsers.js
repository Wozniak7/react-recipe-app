// src/utils/recipeParsers.js

/**
 * Extrai ingredientes e medidas de um objeto de receita da API TheMealDB.
 * A API retorna ingredientes como strIngredient1, strIngredient2, etc. e medidas como strMeasure1, strMeasure2, etc.
 * @param {Object} mealDetail - O objeto de detalhes da refeição da API.
 * @returns {Array<Object>} Um array de objetos { name: string, measure: string }.
 */
export const extractIngredients = (mealDetail) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = mealDetail[`strIngredient${i}`];
        const measure = mealDetail[`strMeasure${i}`];

        // Adiciona o ingrediente se ambos (nome e medida) existirem e não forem vazios
        if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
            ingredients.push({ name: ingredient.trim(), measure: measure.trim() });
        }
    }
    return ingredients;
};

/**
 * Divide a string de instruções em um array de passos individuais.
 * @param {string} instructionsString - A string completa de instruções.
 * @returns {Array<string>} Um array de strings, onde cada string é um passo.
 */
export const parseInstructions = (instructionsString) => {
    if (!instructionsString) {
        return [];
    }
    // Divide a string por quebras de linha ou por pontos seguidos de espaço e letra maiúscula,
    // mas tenta manter a formatação de lista.
    // Remove entradas vazias e espaços em branco.
    return instructionsString
        .split(/\r\n|\n|\.\s*(?=[A-Z])/) // Divide por nova linha ou por ". " seguido de letra maiúscula
        .filter(step => step.trim() !== '')
        .map(step => step.trim());
};
