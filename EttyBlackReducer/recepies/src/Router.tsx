import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./component/center/Layout";
import AddRecipe from "./component/center/AddRecipe";
import AllRecipes from "./component/center/AllRecipes";
import { Login } from "@mui/icons-material";
import UpdateUser from "./component/user/UpdateUser";

// יצירת ה-router עם הנתיבים ונתיבי המשנה
const router = createBrowserRouter([
  {
    path: "/", // דף הבית
    element: <Layout />, // Layout כולל את ה-NavBar ומרכז את התוכן
    children: [
      { path: "", element: <AllRecipes /> }, // הצגת המתכונים בדף הבית
      { path: "all-recipe", element: <AllRecipes /> }, // הצגת המתכונים
      { path: "add-recipe", element: <AddRecipe /> }, // הוספת מתכון
      { path: "login", element: <Login /> }, // דף כניסה
      { path: "updateUser", element: <UpdateUser /> }, // דף עדכון משתמש
    ],
  },
]);

export default router;



