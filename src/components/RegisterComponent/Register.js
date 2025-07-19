import { useState, useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import s from "./Register.module.scss";
import { registerUser } from "../../api";
import { AuthContext, LOGIN } from "../../context/AuthContext";

export default function Register({

}){
    const {dispatch} = useContext(AuthContext);
    const [ user, setUser] = useState({Username: '', Email: '', Password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(user);
                dispatch({ type: 'SET_ISMODALOPEN', payload: false });
                const customAlert = document.createElement('div');
                customAlert.innerText = 'Registration successful! Please Login to continue';
                customAlert.style.position = 'fixed';
                customAlert.style.top = '20px';
                customAlert.style.right = '20px';
                customAlert.style.backgroundColor = '#4CAF50';
                customAlert.style.color = 'white';
                customAlert.style.padding = '10px';
                customAlert.style.borderRadius = '5px';
                customAlert.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
                document.body.appendChild(customAlert);
                setTimeout(() => {
                    customAlert.remove();
                }, 3000);
                navigate('/account');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
        <div className={s.wrapper}>
            <form className={s.form} onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className={s.inputHeader}>
                    <label>Username: </label>
                    <input
                        type="text"
                        name="Username"
                        value={user.Username}
                        placeholder="Username"
                        onChange={handleChange}
                        required>
                    </input>
                </div>
                
                <div className={s.inputHeader}>
                    <label>Email: </label>
                    <input
                        type="email"
                        name="Email"
                        value={user.Email}
                        placeholder="abc@gmail.com"
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div className={s.inputHeader}>
                    <label>password: </label>
                    <input
                        type="password"
                        name="Password"
                        value={user.Password}
                        placeholder="Password"
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <button type="submit" className={s.registerButton}>Register</button>
                </div>
            </form>
            
        </div></>
    );

}