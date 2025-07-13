import { useContext, useRef, useState } from "react";
import { UserContext } from "./userReducer";
import { Button, Box } from "@mui/material";
import UserProfile from "./UserProfile";
import LoginModal from "./LoginModal";

const Login = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    const url = isLogin
      ? "http://localhost:3000/api/user/login"
      : "http://localhost:3000/api/user/register";
    try {
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
          setIsLoggedIn(true);
        } else if (isLogin) {
          const { user } = await response.json();
          userDispatch({
            type: "LOGIN",
            data: user,
          });
          setIsLoggedIn(true);
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

  const handleCloseModal = () => {
    setIsLogin(false);
    setIsSignUp(false);
  };

  if (isLoggedIn) {
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
          gap: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={() => setIsLogin(true)}>
          Login
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setIsSignUp(true)}>
          SignUp
        </Button>
      </Box>

      <LoginModal
        open={isLogin || isSignUp}
        isLogin={isLogin}
        emailRef={emailRef}
        passwordRef={passwordRef}
        onClose={handleCloseModal}
        onSubmit={handleLogin}
      />
    </>
  );
};

export default Login;