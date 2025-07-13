import { Card, CardContent, Typography, Grid } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Recipe } from "../../store/recipeSlice";

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
}

const RecipeList = ({ recipes, onRecipeClick }: RecipeListProps) => {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <Card
            sx={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: 3,
              padding: 2,
              marginBottom: 2,
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
              transition: "transform 0.2s, box-shadow 0.2s",
              textAlign: "right",
              direction: "rtl",
            }}
            onClick={() => onRecipeClick(recipe)}
          >
            <CardContent>
              <FastfoodIcon
                sx={{
                  fontSize: 40,
                  color: "orange",
                  marginBottom: 2,
                }}
              />
              <Typography variant="h6" gutterBottom>
                {recipe.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recipe.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;