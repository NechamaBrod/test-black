import { ChangeEvent, FormEvent, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./userReducer";
import { Button } from "@mui/material";
import UpdateForm from "./UpdateForm";

const UpdateUser = () => {
  const [open, setOpen] = useState(false);
  const { state: user, dispatch: userDispatch } = useContext(UserContext);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    userDispatch({ type: "UPDATE", data: { [id]: value } });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/api/user`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": `${user.id}`,
            "access-control-allow-origin": "*",
          },
        }
      );
      userDispatch({ type: "UPDATE", data: res.data });
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Update Data
      </Button>

      <UpdateForm
        open={open}
        user={user}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </>
  );
};

export default UpdateUser;
