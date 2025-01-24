import React from "react";
import { Box } from "@mui/material";
// Import Link from react-router-dom
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        padding: 2,
        gap: 2,
      }}
    >
      {/* Links to different pages */}
      <nav>
        <Link to="/all-recipe" style={{ textDecoration: "none", color: "blue" }}>
          All Recipes
        </Link>
        {" | "}
        <Link to="/add-recipe" style={{ textDecoration: "none", color: "blue" }}>
          Add Recipe
        </Link>
      </nav>
    </Box>
  );
};

export default NavBar;
