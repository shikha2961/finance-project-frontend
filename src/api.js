import axios from 'axios';
const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    }catch (error){
        throw error.response?.data?.message || "Registration Failed";
    }
};

export const loginUser = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        return response.data;
    }catch (error){
        throw error.response?.data?.message || 'Login failed';
    }
}

const getAuthToken = () => {
    return localStorage.getItem("token"); 
};

export const registerAccount = async(accountData) => {
    try{
        const token = getAuthToken(); 

        const response = await axios.post(`${API_URL}/account/create`, accountData, {
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
        });

        return response.data;
    }catch(error){
        throw error.response?.data?.message || "Account Creation Failed";
    }
}

export const addIncome = async(incomeData) => {
    try{
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/transaction/income`, incomeData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    }catch(error){
        throw error.response?.data?.message || "Income addition failed";
    }
}

export const addExpense = async(expenseData) => {
    try{
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/transaction/expense`, expenseData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    }catch(error){
        throw error.response?.data?.message || "Expense addition failed";
    }
}


export const getTransactions = async(accountID) => {
    try{
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/transaction/${accountID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch(error){
        throw error.response?.data?.message || "Failed to get transactions";
    }
}