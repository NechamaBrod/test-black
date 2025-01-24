import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import User from "../user/User";
import userReducer, { initialState, UserContext } from "../user/userReducer";
import { useReducer } from "react";



const Layout = () => {
  const [user, dispatchUser] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state: user, dispatch: dispatchUser }}>
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* חלק עליון - כותרת */}
      <Box sx={{ width: "100%", backgroundColor: "#3f51b5", color: "#fff", padding: 2, marginTop: 20 }}>
          <Typography variant="h4" align="center">
            ברוכים הבאים לבית המתכונים
          </Typography>
      </Box>

      {/* ה-NavBar */}
      <NavBar />

      {/* תצוגת המשתמש */}
      <User />

      {/* אזור שבו יוצג התוכן של כל Route */}
      <Box sx={{ paddingTop: 2, width: "100%" }}>
        <Outlet />  {/* זה יטעין את התוכן של כל Route */}
      </Box>
    </Box>
  </UserContext.Provider>

  );
};

export default Layout;