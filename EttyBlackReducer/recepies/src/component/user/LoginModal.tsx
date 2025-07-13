import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { RefObject } from "react";

interface LoginModalProps {
  open: boolean;
  isLogin: boolean;
  emailRef: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onSubmit: () => void;
}

const LoginModal = ({ open, isLogin, emailRef, passwordRef, onClose, onSubmit }: LoginModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
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
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Send
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;