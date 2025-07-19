import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    isModalOpen: false,
    isIncomeModalOpen: false,
    isExpenseModalOpen: false,
    accountData: null,
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_USER = "SET_USER";
export const LOADING = "LOADING";
export const SET_ISMODALOPEN = "SET_ISMODALOPEN";
export const SET_ISINCOMEMODALOPEN = "SET_ISINCOMEMODALOPEN";
export const SET_ISEXPENSEMODALOPEN = "SET_ISEXPENSEMODALOPEN";
export const SET_ACCOUNTDATA = "SET_ACCOUNTDATA";

const authReducer = (state, action) => {
    switch(action.type){
        case LOGIN:
            return {...state, user: action.payload, isAuthenticated: true, loading: false};

        case LOGOUT:
            return {...state, user: null, isAuthenticated: false, loading: false};

        case SET_USER:
            return {...state, user: action.payload, isAuthenticated: true, loading:false};

        case LOADING:
            return {...state, loading: true};

        case SET_ISMODALOPEN:
            return {...state, isModalOpen: action.payload};

        case SET_ISINCOMEMODALOPEN:
            return {...state, isIncomeModalOpen: action.payload};

        case SET_ISEXPENSEMODALOPEN:
            return {...state, isExpenseModalOpen: action.payload};
            
        case SET_ACCOUNTDATA:
            return {...state, accountData: action.payload};
            
        default:
            return state;
    }
}
const isTokenExpired = (token) => {
    if (!token) return true; // No token means it's expired

    try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        return decoded.exp * 1000 < Date.now(); // Check if expiry time is in the past
    } catch (error) {
        return true; // If decoding fails, consider it expired
    }
};


export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const token = localStorage.getItem('token');
                if(isTokenExpired(token)){
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('accountId');
                    localStorage.removeItem('accountData');
                    localStorage.removeItem('accountName');
                    dispatch({type: LOGOUT});
                    navigate('/')
                }else{
                    dispatch({type: SET_USER, payload: localStorage.getItem('user')});
                    console.log("user is still logged in..", localStorage.getItem('token'));
                }
                
            }catch (error) {
                            console.error('Auth Error:', error);
                            dispatch({ type: 'LOGOUT' });
                            localStorage.removeItem('token');
                            navigate('/login');
                        }
        }
        fetchUser();
    }, [navigate]);
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};
