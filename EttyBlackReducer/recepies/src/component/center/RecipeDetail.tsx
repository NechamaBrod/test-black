import { Box, Card, CardContent, Typography } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Recipe } from "../../store/recipeSlice";

interface RecipeDetailProps {
  selectedRecipe: Recipe | null;
}

const RecipeDetail = ({ selectedRecipe }: RecipeDetailProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        backgroundColor: "#f0f0f0",
        overflowY: "auto",
      }}
    >
      {selectedRecipe ? (
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
        >
          <FastfoodIcon
            sx={{
              fontSize: 60,
              color: "orange",
              marginBottom: 2,
            }}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {selectedRecipe.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedRecipe.details}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h5" color="text.secondary">
          בחר מתכון להצגה
        </Typography>
      )}
    </Box>
  );
};

export default RecipeDetail;