import { useContext } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { UserContext } from "../user/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { addRecipe, clearError } from "../../store/recipeSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("שם המתכון הוא חובה").min(2, "שם המתכון חייב להכיל לפחות 2 תווים"),
  description: yup.string().required("תיאור המתכון הוא חובה").min(10, "התיאור חייב להכיל לפחות 10 תווים"),
  details: yup.string().required("פרטים נוספים הם חובה").min(20, "הפרטים חייבים להכיל לפחות 20 תווים"),
});

type FormData = yup.InferType<typeof schema>;

const AddRecipe = () => {
  const { state: user } = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.recipes);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    if (!user.id) {
      return;
    }

    dispatch(clearError());
    
    try {
      await dispatch(addRecipe({
        ...data,
        authorId: user.id,
      })).unwrap();
      
      reset();
    } catch (err) {
      console.error("Error adding recipe:", err);
    }
  };

  if (!user.id) {
    return (
      <Alert severity="warning">עליך להתחבר כדי להוסיף מתכון.</Alert>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        {...register("title")}
        label="שם המתכון"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{ backgroundColor: '#ffffff' }}
      />
      
      <TextField
        {...register("description")}
        label="תיאור המתכון"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={{ backgroundColor: '#ffffff' }}
      />
      
      <TextField
        {...register("details")}
        label="פרטים נוספים"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        error={!!errors.details}
        helperText={errors.details?.message}
        sx={{ backgroundColor: '#ffffff' }}
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{
          marginTop: 2,
          padding: '10px 20px',
          fontSize: '16px',
        }}
      >
        {loading ? "מוסיף מתכון..." : "הוסף מתכון"}
      </Button>
    </Box>
  );
};

export default AddRecipe;