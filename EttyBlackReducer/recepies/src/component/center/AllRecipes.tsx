import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

interface Recipe {
  id: number;
  title: string;
  description: string;
  details: string;
}

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        if (!response.ok) {
          throw new Error(`Error fetching recipes: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError("Error fetching recipes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
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
      {/* צד שמאלי להצגת מתכון נבחר */}
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

      {/* צד ימני להצגת רשימת המתכונים */}
      <Box
        sx={{
          flex: 1,
          padding: 10,
          backgroundColor: "#e8e8e8",
          overflowY: "auto",
        }}
      >
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
                   marginBottom: 2,   cursor: "pointer", // מוסיף סמן אצבע כאשר העכבר על הכרטיס
                   "&:hover": {
                     transform: "scale(1.05)", // הגדלה קלה בהובר
                     boxShadow: 6, // צל חזק יותר בהובר
                   },
                   transition: "transform 0.2s, box-shadow 0.2s", // מעברים חלקים
                   textAlign: "right", // יישור הטקסט לימין
                   direction: "rtl", // תומך בשפות מימין לשמאל
                 }}
                onClick={() => handleRecipeClick(recipe)}
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
      </Box>
    </Box>
  );
};

export default AllRecipes;
