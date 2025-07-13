import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchRecipes, selectRecipe, Recipe } from "../../store/recipeSlice";
import RecipeDetail from "./RecipeDetail";
import RecipeList from "./RecipeList";

const AllRecipes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, selectedRecipe, loading, error } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleRecipeClick = (recipe: Recipe) => {
    dispatch(selectRecipe(recipe));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <RecipeDetail selectedRecipe={selectedRecipe} />
      
      <Box
        sx={{
          flex: 1,
          padding: 10,
          backgroundColor: "#e8e8e8",
          overflowY: "auto",
        }}
      >
        <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
      </Box>
    </Box>
  );
};

export default AllRecipes;
