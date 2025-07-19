import s from "./login.module.scss";
import { useContext, useState, useEffect } from "react";
import { loginUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { AuthContext, LOGIN } from "../../context/AuthContext";

export default function Login({

}){
    const {dispatch} = useContext(AuthContext);
    const [ user, setUser] = useState({Email: '', Password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(user);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', response.user.username);
            dispatch({ type: 'LOGIN', payload: response.user });
            dispatch({ type: 'SET_ISMODALOPEN', payload: false });
            if(response.user.hasAccount){
                localStorage.setItem('accountId', response.user.account.AccountID);   
                localStorage.setItem('accountName', response.user.account.AccountName);
            }else{
                navigate('/account');
            }
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        const accountId = localStorage.getItem('accountId');
        if(accountId){
            navigate('/dashboard');
        }
    })

    return (
        <div className={s.wrapper}>
        <form className={s.form} onSubmit={handleSubmit}>
            <h2>Login</h2>
            
            <div className={s.inputHeader}>
                <label>Email: </label>
                <input
                    type="email"
                    name="Email"
                    value={user.Email}
                    placeholder="abc@gmail.com"
                    onChange={handleChange}>
                </input>
            </div>

            <div className={s.inputHeader}>
                <label>password: </label>
                <input
                    type="password"
                    name="Password"
                    value={user.Password}
                    placeholder="Password"
                    onChange={handleChange}>
                </input>
            </div>

            <div>
                <button type="submit" className={s.loginButton}>Login</button>
            </div>
            
        </form>
        
    </div>
    );
}