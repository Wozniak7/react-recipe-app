export const mockRecipes = [
    {
        id: 'rec1',
        title: 'Bolo de Chocolate Clássico',
        description: 'Um bolo úmido e delicioso, perfeito para qualquer ocasião.',
        imageUrl: 'https://placehold.co/400x300/a8e6cf/000000?text=Bolo+Chocolate',
        ingredients: [
            { name: 'Farinha', quantity: 2, unit: 'xícaras' },
            { name: 'Açúcar', quantity: 1.5, unit: 'xícaras' },
            { name: 'Chocolate em pó', quantity: 0.75, unit: 'xícaras' },
            { name: 'Ovos', quantity: 3, unit: 'unidades' },
        ],
        instructions: [
            'Pré-aqueça o forno.',
            'Misture ingredientes secos.',
            'Adicione líquidos e misture.',
            'Asse por 30 minutos.'
        ],
        prepTimeMinutes: 20,
        cookTimeMinutes: 35,
        servings: 8,
    },
    {
        id: 'rec2',
        title: 'Salada Caesar com Frango',
        description: 'Uma salada Caesar fresca e crocante com suculento frango grelhado.',
        imageUrl: 'https://placehold.co/400x300/d4a5a5/000000?text=Salada+Caesar',
        ingredients: [
            { name: 'Alface Romana', quantity: 1, unit: 'cabeça' },
            { name: 'Peito de Frango', quantity: 200, unit: 'gramas' },
            { name: 'Croutons', quantity: 1, unit: 'xícara' },
            { name: 'Molho Caesar', quantity: 0.5, unit: 'xícara' },
        ],
        instructions: [
            'Grelhe o frango e corte em fatias.',
            'Lave e pique a alface.',
            'Combine todos os ingredientes.',
            'Sirva com molho.'
        ],
        prepTimeMinutes: 15,
        cookTimeMinutes: 10,
        servings: 2,
    },
    {
        id: 'rec3',
        title: 'Pizza Margherita Caseira',
        description: 'A clássica pizza italiana com molho de tomate, mussarela e manjericão fresco.',
        imageUrl: 'https://placehold.co/400x300/f0e68c/000000?text=Pizza+Margherita',
        ingredients: [
            { name: 'Massa de pizza', quantity: 1, unit: 'unidade' },
            { name: 'Molho de tomate', quantity: 0.5, unit: 'xícara' },
            { name: 'Mussarela', quantity: 200, unit: 'gramas' },
            { name: 'Manjericão fresco', quantity: 10, unit: 'folhas' },
        ],
        instructions: [
            'Estenda a massa.',
            'Espalhe o molho e a mussarela.',
            'Asse em forno pré-aquecido.',
            'Decore com manjericão.'
        ],
        prepTimeMinutes: 20,
        cookTimeMinutes: 15,
        servings: 4,
    },
    {
        id: 'rec4',
        title: 'Smoothie de Frutas Vermelhas',
        description: 'Um smoothie refrescante e saudável com uma mistura de frutas vermelhas.',
        imageUrl: 'https://placehold.co/400x300/add8e6/000000?text=Smoothie+Frutas',
        ingredients: [
            { name: 'Frutas vermelhas congeladas', quantity: 1, unit: 'xícara' },
            { name: 'Banana', quantity: 1, unit: 'unidade' },
            { name: 'Iogurte natural', quantity: 0.5, unit: 'xícara' },
            { name: 'Leite', quantity: 0.5, unit: 'xícara' },
        ],
        instructions: [
            'Combine todos os ingredientes no liquidificador.',
            'Bata até ficar homogêneo.',
            'Sirva imediatamente.'
        ],
        prepTimeMinutes: 5,
        cookTimeMinutes: 0,
        servings: 1,
    }
];

// Se você precisar de um "tipo" Recipe para documentação, pode usar JSDoc:
/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {number} quantity
 * @property {string} unit
 */

/**
 * @typedef {Object} Recipe
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} imageUrl
 * @property {Ingredient[]} ingredients
 * @property {string[]} instructions
 * @property {number} [prepTimeMinutes]
 * @property {number} [cookTimeMinutes]
 * @property {number} [servings]
 */
