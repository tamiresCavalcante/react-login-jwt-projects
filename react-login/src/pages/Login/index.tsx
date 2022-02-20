import { ChangeEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth/AuthContext";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        if (email && password) {
            const isLogged = await auth.signin(email, password);
            if (isLogged) {
                navigate('/');
            } else {
                alert("Não deu certo.");
            }
        }
    }

    return (
        <div>
            <h2>Pagina fechada</h2>
            <input 
                type="text" 
                value={email} 
                placeholder="Digite o email" 
                onChange={handleEmailInput} 
            />

            <input 
                type="password" 
                value={password} 
                placeholder="Digite a senha" 
                onChange={handlePasswordInput} 
            />
            
            <button onClick={handleLogin}>Logar</button>
        </div>
    );
}