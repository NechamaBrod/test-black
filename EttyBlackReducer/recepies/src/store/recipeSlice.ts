import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  details: string;
  authorId?: number;
}

interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  selectedRecipe: Recipe | null;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
  selectedRecipe: null,
};

// Async thunks for API calls
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await fetch('http://localhost:3000/api/recipes');
    if (!response.ok) {
      throw new Error(`Error fetching recipes: ${response.status}`);
    }
    return response.json();
  }
);

export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async (recipe: Omit<Recipe, 'id'>) => {
    const response = await fetch('http://localhost:3000/api/recipes/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error('Failed to add recipe');
    }
    return response.json();
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    selectRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload.recipe);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add recipe';
      });
  },
});

export const { selectRecipe, clearError } = recipeSlice.actions;
export default recipeSlice.reducer;