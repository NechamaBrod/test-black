import { ChangeEvent, FormEvent } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { UserType } from "./userReducer";

interface UpdateFormProps {
  open: boolean;
  user: UserType;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UpdateForm = ({ open, user, onClose, onSubmit, onChange }: UpdateFormProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 2,
          width: 400,
        }}
      >
        <Typography component="label">First name:</Typography>
        <TextField
          value={user.firstName}
          onChange={onChange}
          id="firstName"
        />

        <Typography component="label">Last name:</Typography>
        <TextField
          value={user.lastName}
          onChange={onChange}
          id="lastName"
        />

        <Typography component="label">Email:</Typography>
        <TextField
          value={user.email}
          onChange={onChange}
          id="email"
        />

        <Typography component="label">Address:</Typography>
        <TextField
          value={user.address}
          onChange={onChange}
          id="address"
        />

        <Typography component="label">Phone:</Typography>
        <TextField
          value={user.phone}
          onChange={onChange}
          id="phone"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ gridColumn: "span 2" }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateForm;