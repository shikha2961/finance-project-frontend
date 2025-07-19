import s from "./Navbar.module.scss";
import { AuthContext } from "../../context/AuthContext";
import { use, useContext, useState } from "react";
import CustomModal from "../Modal/modal";
import Register from "../RegisterComponent/Register";
import Login from "../LoginComponent/login";
import { useNavigate } from "react-router-dom";

export default function Navbar({}){
    const {state, dispatch} = useContext(AuthContext);
    const { isAuthenticated } = state;
    const { isModalOpen } = state;
    const username = localStorage.getItem('user');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleClick = (login) => {
        setIsLogin(login)
        dispatch({type: 'SET_ISMODALOPEN', payload: true});
    }

    const closeModal = () => {
        dispatch({type: 'SET_ISMODALOPEN', payload: false});
    }

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'});
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('accountId');
        localStorage.removeItem('accountName');
        navigate('/');
    }
    return (
        <div className={s.navheader}>
            <h1>Personal Finance Management</h1>
            {isAuthenticated && username?
            <div className={s.userSection}>
                <div className={s.userIcon}>{username.charAt(0).toUpperCase()}</div>
                <button className={s.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
                
            : <button className={s.signButton} onClick={() => handleClick(true)}>Sign In</button>}
            <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
                {
                    isLogin? <Login></Login> : <Register></Register>
                }
                <button className={s.loginButton} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin? "Create an account" : "Sign In"}
                </button>
            </CustomModal>
        </div>
    );
}