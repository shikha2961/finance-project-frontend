import CustomModal from "../Modal/modal";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addIncome } from "../../api";
import s from './addIncome.module.scss';
export default function AddIncome ({onTransactionUpdate}) {
    const {state, dispatch} = useContext(AuthContext);
    const {isIncomeModalOpen} = state;
    const [income, setIncome] = useState({accountID: null, incomeType: '', incomeAmount: '', incomeDate: '', incomeDescription: '', payMethod: 'cash', categoryName: 'salary'});
    
    const handleChange = (e) => {
        setIncome({...income, [e.target.name]: e.target.value});
        
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        // Add income logic here
        const accountId = localStorage.getItem('accountId');
        const updatedIncome = {...income, accountID: accountId};
    setIncome({accountID: null, incomeType: '', incomeAmount: '', incomeDate: '', incomeDescription: '', payMethod: 'cash', categoryName: 'salary'});
        try{
            const incomeResponse = await addIncome(updatedIncome);
            dispatch({type: 'SET_ISINCOMEMODALOPEN', payload: false});
            onTransactionUpdate();
        }
       catch(err){
           console.log(err);
       }

    }
    return (
        <CustomModal isOpen={isIncomeModalOpen} onRequestClose={() => dispatch({type: 'SET_ISINCOMEMODALOPEN', payload: false})}>
            <div className={s.modalContent}>
            <div>
                <h2>🚀 Add your income here!</h2>
                <form className={s.form}>
                    <div>
                        <label>Income Source </label>
                        <input type="text" placeholder="Income Source" name="incomeType" value={income.incomeType} onChange={handleChange} required/>
                    </div>
                    
                    <div>
                        <label>Amount </label>
                        <input type="number" placeholder="Amount" name="incomeAmount" value={income.incomeAmount} onChange={handleChange} required/>
                    </div>
                    
                    <div>
                        <label>Date </label>
                        <input type="date" name="incomeDate" value={income.incomeDate} onChange={handleChange} required/>
                    </div>

                    <div>
                        <label>Category </label>
                        <select name="categoryName" value={income.categoryName} onChange={handleChange} required>
                            <option value="salary">Salary</option>
                            <option value="business">Business</option>
                            <option value="rent">Rent</option>
                            <option value="others">Others</option>
                        </select>

                    </div>
                    
                    <div>
                        <label>Payment Method </label>
                        <select name="payMethod" value={income.payMethod} onChange={handleChange}>
                            <option value="cash">Cash</option>
                            <option value="Card">Card</option>
                            <option value="Check">Check</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea name="incomeDescription" placeholder="Description" value={income.incomeDescription} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <button onClick={handleSubmit} type='submit' >Add Income</button>
                    </div>
                </form>
            </div>
        </div>
        </CustomModal>
        
    )
}
