import React, { useContext, useState } from "react";
import { UserContext } from "./userReducer";
import {
  Avatar,
  Button,
  Box,
  Typography,
  Modal,
  TextField,
} from "@mui/material";

const UserProfile = () => {
  const { state: user, dispatch } = useContext(UserContext); // גישה למצב המשתמש
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setNewLastName] = useState(user.lastName);

  const handleUpdate = () => {
    dispatch({
      type: "UPDATE",
      data: {
        firstName: newFirstName,
        lastName: newLastName,
      },
    });
    setIsEditing(false);
  };

  return (
    <>
      {/* תצוגת פרופיל המשתמש */}
      <Box
        sx={{
            display: "flex",
            flexDirection: "column", // אם זה עמודה
            alignItems: "flex-start", // יישור לשמאל
            justifyContent: "flex-start", // יישור למעלה
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            position: "absolute", // למיקום יחסית לעמוד
            top: 20, // מרחק מהחלק העליון
            left: 20, // מרחק מהשמאל
        }}
      >
        {/* אווטאר עם האות הראשונה של השם */}
        <Avatar sx={{ bgcolor: "primary.main" }}>
          {user.firstName.charAt(0).toUpperCase()}
        </Avatar>

        {/* שם המשתמש */}
        <Typography variant="h6">
          {user.firstName} {user.lastName}
        </Typography>

        {/* כפתור לעדכון פרטי המשתמש */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsEditing(true)}
        >
          עדכון פרטים
        </Button>
      </Box>

      {/* חלון עדכון פרטי המשתמש */}
      <Modal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        aria-labelledby="edit-user-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="edit-user-details" variant="h6" mb={2}>
            עדכון פרטי משתמש
          </Typography>
          <TextField
            label="שם פרטי"
            fullWidth
            margin="normal"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <TextField
            label="שם משפחה"
            fullWidth
            margin="normal"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              שמור
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
            >
              ביטול
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserProfile;
