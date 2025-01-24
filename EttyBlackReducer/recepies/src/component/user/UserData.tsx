import { useContext } from "react";
import UpdateUser from "./UpdateUser";
import { UserContext } from "./userReducer";
import { Box, Typography, Avatar } from "@mui/material";

const UserData = () => {
  const { state: user } = useContext(UserContext);

  // הפקת האות הראשונה מתוך השם או המייל
  const getInitial = () => {
    return (user.firstName || user.email || "U")[0].toUpperCase();
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto", // עמודה לאווטאר, טקסט, ועדכון
        gap: 2, // רווח בין האלמנטים
        position: "absolute",
        top: 0,
        left: 0,
        padding: 2,
        alignItems: "center", // יישור אנכי
        minHeight: 60, // גובה מינימלי לקומפוננטה
      }}
    >
      {/* אווטאר */}
      <Avatar
        alt={user.firstName || "User"}
        sx={{
          bgcolor: "primary.main", // צבע רקע
          width: 40,
          height: 40,
          fontSize: 18, // גודל הפונט בתוך האווטאר
        }}
      >
        {getInitial()}
      </Avatar>

      {/* טקסט */}
      <Box>
        <Typography variant="h6">
          Hello, {user.firstName || user.email}
        </Typography>
      </Box>

      {/* אזור לעדכון משתמש */}
      <Box>
        <UpdateUser />
      </Box>
    </Box>
  );
};

export default UserData;
