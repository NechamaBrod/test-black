import React, { useContext, useRef, useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { UserContext } from "../user/userReducer";

const AddRecipe = () => {
  const { state: user } = useContext(UserContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddRecipe = async () => {
    setError(null);
    setSuccess(null);
    if (!user.id) {
      setError("עליך להתחבר כדי להוסיף מתכון.");
      console.log("Current User:", user);
      return;
    }

 

    try {
        const response = await fetch("http://localhost:3000/api/recipes/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",  // כותרת CORS בצד הלקוח (לא תמיד נדרשת, אבל אפשר להוסיף)
            },
            
            body: JSON.stringify({
              id:user.id,
              title: titleRef.current?.value,
              description: descriptionRef.current?.value,
              details: detailsRef.current?.value,
              authorId: user.id,  // אם אתה שולח את ה-authorId
            }),
        });

        if (!response.ok) {
            throw new Error("הוספת המתכון נכשלה.");
        }

        setSuccess("המתכון נוסף בהצלחה!");
        titleRef.current!.value = "";
        descriptionRef.current!.value = "";
        detailsRef.current!.value = "";
    } catch (err) {
        console.error(err);
        setError("שגיאה בהוספת המתכון.");
    }
};

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      padding: 4,
      maxWidth: 600,
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      borderRadius: 3,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Typography variant="h4" textAlign="center" gutterBottom>
      הוסף מתכון חדש
    </Typography>

    {/* אם יש שגיאה */}
    {error && <Alert severity="error">{error}</Alert>}
    
    {/* אם ההוספה הצליחה */}
    {success && <Alert severity="success">{success}</Alert>}

    {/* טופס הוספת המתכון */}
    <TextField
      inputRef={titleRef}
      label="שם המתכון"
      variant="outlined"
      fullWidth
      margin="normal"
      sx={{ backgroundColor: '#ffffff' }}
    />
    
    <TextField
      inputRef={descriptionRef}
      label="תיאור המתכון"
      variant="outlined"
      fullWidth
      margin="normal"
      sx={{ backgroundColor: '#ffffff' }}
    />
    
    <TextField
      inputRef={detailsRef}
      label="פרטים נוספים"
      variant="outlined"
      fullWidth
      multiline
      rows={4}
      margin="normal"
      sx={{ backgroundColor: '#ffffff' }}
      
    />
    
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddRecipe}
      sx={{
        marginTop: 2,
        padding: '10px 20px',
        fontSize: '16px',
      }}
    >
      הוסף מתכון
    </Button>
  </Box>
);
};

export default AddRecipe;