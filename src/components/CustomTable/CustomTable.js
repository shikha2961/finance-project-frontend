import { useState, useContext, useEffect } from "react";
import { getTransactions } from "../../api";
import s from "./CustomTable.module.scss";
export default function CustomTable ({
  data,
}) {
     const [transactions, setTransactions] = useState([]);
      const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
      setTransactions(data);
      setLoading(false);
    }, [data]);
    
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className={s.tableContainer}>
            <table className={s.table}>
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Transaction Type</th>
                        <th>Source</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>   
            </thead>
            <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className={s.loading}>Loading...</td>
                        </tr>
                    ) : transactions.map((transaction) => (
                        <tr key={transaction.TransactionID}>
                            <td>{formatDate(transaction.TransactionDate)}</td>
                            <td>{transaction.TransactionType}</td>
                            <td>{transaction.Source}</td>
                            <td>{transaction.categoryName}</td>
                            <td>{transaction.Description}</td>
                            <td className={transaction.TransactionType === 'Credit' ? s.credit : s.debit}>
                                {transaction.TransactionType === 'Credit' ? '+' : '-'}
                                {transaction.TransactionAmount}
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
    </div>
    )
}