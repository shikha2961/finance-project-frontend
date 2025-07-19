import React, {useContext, useState} from 'react';
import CustomModal from '../Modal/modal';
import { AuthContext } from '../../context/AuthContext';
import { addExpense } from '../../api';
import s from './addExpense.module.scss';
import { useNavigate } from 'react-router-dom';

export default function AddExpense({onTransactionUpdate}){
    const{state, dispatch} = useContext(AuthContext);
    const {isExpenseModalOpen} = state;
    const [expense, setExpense] = useState({accountID: null, expenseType: '', expenseAmount: '', expenseDate: '', expenseDescription: '', payMethod: 'cash', categoryName: 'grocery'});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setExpense({...expense, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Add expense logic here
        const accountId = localStorage.getItem('accountId');
        const updatedExpense = {...expense, accountID: accountId};
        setExpense({accountID: null, expenseType: '', expenseAmount: '', expenseDate: '', expenseDescription: '', payMethod: 'cash', categoryName: 'grocery'});
        try{
            await addExpense(updatedExpense);
            dispatch({type: 'SET_ISEXPENSEMODALOPEN', payload: false});
            onTransactionUpdate();
            // navigate('/dashboard');
        }catch(err){
            console.log(err);
        }
    }

    return (
        <CustomModal isOpen={isExpenseModalOpen} onRequestClose={() => dispatch({type: 'SET_ISEXPENSEMODALOPEN', payload: false})}>
            <div className={s.modalContent}>
                <h2>Add Your Expenses</h2>

                <form className={s.form}>
                    <div>
                        <label>Expense Source</label>
                        <input type="text" placeholder="Expense Source" name="expenseType" value={expense.expenseType} onChange={handleChange} required/>
                    </div>

                    <div>
                        <label>Amount</label>
                        <input type="number" placeholder="Amount" name="expenseAmount" value={expense.expenseAmount} onChange={handleChange} required/>
                    </div>

                    <div>
                        <label>Date</label>
                        <input type="date" name="expenseDate" value={expense.expenseDate} onChange={handleChange} required/>
                    </div>

                    <div>
                        <label>Category</label>
                        <select name="categoryName" value={expense.categoryName} onChange={handleChange}>
                            <option value="grocery">Grocery</option>
                            <option value="food">Food</option>
                            <option value="rent">Rent</option>
                            <option value="travel">Travel</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label>Payment Method</label>
                        <select name="payMethod" value={expense.payMethod} onChange={handleChange}>
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                            <option value="check">Check</option>
                            <option value="upi">UPI</option>
                        </select>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea name="expenseDescription" placeholder="Description" value={expense.expenseDescription} onChange={handleChange}></textarea>
                    </div>

                    <div>
                        <button onClick={handleSubmit} type='submit'>Add Expense</button>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}