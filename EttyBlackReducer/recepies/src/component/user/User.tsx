import { useReducer } from "react";
import userReducer, { initialState, UserContext } from "./userReducer";
import Login from "./Login";
import UserData from "./UserData";
import AddRecipe from "../center/AddRecipe";

const User = () => {
    const [user, dispatchUser] = useReducer(userReducer, initialState);

    return (<>
       {!user.email ? (
    <Login /> // מציג מסך התחברות אם המשתמש לא מחובר
) : (
    <>
        <UserData /> {/* מציג נתוני משתמש */}
    </>
)}
    </>)
}
export default User;