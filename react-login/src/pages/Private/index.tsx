import { useContext } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";

export const Private = () => {

    const auth = useContext(AuthContext);

    return (
        <div>
            <h2>This is the Private Page</h2>
    
            <h2>Hello {auth.user?.name} !</h2>
        </div>

    );
}