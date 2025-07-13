import { useContext } from "react";
import { UserContext } from "./userReducer";
import Login from "./Login";
import UserData from "./UserData";

const User = () => {
    const { state: user } = useContext(UserContext);

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