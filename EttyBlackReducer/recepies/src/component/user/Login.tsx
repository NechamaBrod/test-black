import { useContext, useRef, useState } from "react";
import { UserContext } from "./userReducer";
import { Button, Box, TextField, Typography, Modal, Alert } from "@mui/material";
import UserProfile from "./UserProfile"; // ייבוא הקומפוננטה החדשה

const Login = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // מצב התחברות

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    const url = isLogin
      ? "http://localhost:3000/api/user/login"
      : "http://localhost:3000/api/user/register";
    try {
      console.log(url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
      });

      if (response.status === 401) {
        alert("משתמש לא מוכר נסה להרשם");
      } else if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      } else {
        if (isSignUp) {
          const { userId } = await response.json();
          userDispatch({
            type: "SIGNUP",
            data: {
              id: userId,
              email: emailRef.current?.value || "",
              password: passwordRef.current?.value || "",
            },
          });
          setIsLoggedIn(true); // הגדרת התחברות
        } else if (isLogin) {
          const { user } = await response.json();
          userDispatch({
            type: "LOGIN",
            data: user,
          });
          setIsLoggedIn(true); // הגדרת התחברות
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      isLogin && setIsLogin(false);
      isSignUp && setIsSignUp(false);
    }
  };

  if (isLoggedIn) {
  
    // אם המשתמש מחובר, הצג את קומפוננטת UserProfile
    return <UserProfile />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: "absolute",
          top: 0,
          left: 0,
          padding: 2,
          gap: 2, // מרווח בין הכפתורים
        }}
      >
        <Button variant="contained" color="primary" onClick={() => setIsLogin(true)}>
          Login
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setIsSignUp(true)}>
          SignUp
        </Button>
      </Box>

      {(isLogin || isSignUp) && (
        <Modal
          open={isLogin || isSignUp}
          onClose={() => {
            setIsLogin(false);
            setIsSignUp(false);
          }}
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
            <Typography variant="h6" component="h2" mb={2}>
              {isLogin ? "Login" : "Sign Up"}
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              inputRef={emailRef}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              inputRef={passwordRef}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Send
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsLogin(false);
                  setIsSignUp(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Login;