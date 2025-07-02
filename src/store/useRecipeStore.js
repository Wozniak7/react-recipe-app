// src/store/useRecipeStore.js
import { create } from 'zustand';
import { extractIngredients, parseInstructions } from '../utils/recipeParsers';

// Variável para o debounce do termo de busca
let searchDebounceTimer = null;

// Cria o store de receitas
const useRecipeStore = create((set, get) => ({
    // --- Estado ---
    searchTerm: '', // Termo de busca atual
    recipes: [], // Lista de receitas retornadas pela busca
    selectedRecipeId: null, // ID da receita selecionada para detalhes
    selectedRecipeDetails: null, // Detalhes completos da receita selecionada
    isLoading: false, // Flag de carregamento
    error: null, // Mensagem de erro

    // --- Ações ---

    // Ação para definir o termo de busca e disparar a busca de receitas com debounce
    setSearchTerm: (newSearchTerm) => {
        set({ searchTerm: newSearchTerm, selectedRecipeId: null, selectedRecipeDetails: null });

        // Limpa o timer anterior para evitar múltiplas chamadas
        if (searchDebounceTimer) {
            clearTimeout(searchDebounceTimer);
        }

        // Define um novo timer para buscar receitas após um pequeno atraso
        searchDebounceTimer = setTimeout(() => {
            get().fetchRecipes(); // Chama a ação de busca após o debounce
        }, 500); // 500ms de debounce
    },

    // Ação assíncrona para buscar receitas da API TheMealDB
    fetchRecipes: async () => {
        const currentSearchTerm = get().searchTerm; // Obtém o termo de busca atual do estado

        // Se o termo de busca estiver vazio, não faz a requisição
        if (!currentSearchTerm) {
            set({ recipes: [], isLoading: false, error: null });
            return;
        }

        set({ isLoading: true, error: null }); // Define carregando e limpa erros

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${currentSearchTerm}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            set({ recipes: data.meals || [] }); // Atualiza a lista de receitas
        } catch (e) {
            set({ error: "Falha ao buscar receitas. Tente novamente mais tarde." });
            console.error("Erro ao buscar receitas:", e);
        } finally {
            set({ isLoading: false });
        }
    },

    // Ação para definir a receita selecionada e disparar a busca de seus detalhes
    setSelectedRecipeId: (id) => {
        set({ selectedRecipeId: id });
        if (id) {
            get().fetchRecipeDetails(id); // Chama a ação para buscar detalhes
        } else {
            set({ selectedRecipeDetails: null }); // Limpa detalhes se nenhum ID for selecionado
        }
    },

    // Ação assíncrona para buscar detalhes de uma receita específica
    fetchRecipeDetails: async (id) => {
        if (!id) {
            set({ selectedRecipeDetails: null, isLoading: false, error: null });
            return;
        }

        set({ isLoading: true, error: null });

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            set({ selectedRecipeDetails: data.meals ? data.meals[0] : null });
        } catch (e) {
            set({ error: "Falha ao carregar detalhes da receita." });
            console.error("Erro ao buscar detalhes da receita:", e);
        } finally {
            set({ isLoading: false });
        }
    },

    // Ação para limpar o erro
    clearError: () => set({ error: null }),

    // Ação para voltar à lista (limpa a receita selecionada e seus detalhes)
    backToList: () => set({ selectedRecipeId: null, selectedRecipeDetails: null }),
}));

export default useRecipeStore;
