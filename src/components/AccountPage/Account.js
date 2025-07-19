import { useState, useContext } from 'react';
import s from './account.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { registerAccount } from '../../api';
export default function Account({

}){
    const {state, dispatch} = useContext(AuthContext); 
    const { isAuthenticated} = state;
    const username = localStorage.getItem('user');
    const [accountTempData, setAccountTempData] = useState({accountName: '', accountType: 'Savings'});
    const Navigate = useNavigate();

    const handleChange = (e) => {
        setAccountTempData({...accountTempData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await registerAccount(accountTempData);
        localStorage.setItem('accountId', response.account.id);  
        localStorage.setItem('accountName', response.account.accountName); 
        Navigate('/dashboard');
    }

    return (
        <div className={s.wrapper}>
            {isAuthenticated? 
            <>
             <h2>Welcome, {username}!</h2>
             <p>🚀 Let's set up your account to start tracking your finances.</p>
     
             <form className={s.accountform} onSubmit={handleSubmit}>
             <h3>🏦 Create Your Account</h3>
                 <div>
                     <label>Account Name </label>
                     <input type="text" placeholder="Account Name"  name="accountName" value={accountTempData.accountName} onChange={handleChange} required/>
                 </div>
                 
                 <div>
                     <label>Account Type </label>
                     <select name="accountType" value={accountTempData.accountType || 'Savings'} onChange={handleChange}>
                         <option value="Savings">Savings</option>
                         <option value="Checking">Checking</option>
                         <option value="Business">Business</option>
                         <option value="Investment">Investment</option>
                     </select>
                 </div>
                 
                 <div>
                     <button type='submit' >Create Account</button>
                 </div>
                 
             </form>
             </>
         : 
        <h2>Please Login to create account</h2> }
       </div>
       
    );
}