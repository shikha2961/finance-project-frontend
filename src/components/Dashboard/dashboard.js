import AddIncome from "../Income/addIncome";
import { useEffect, useState, useRef } from "react";
import s from "./dashboard.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddExpense from "../Expense/addExpense";
import CustomTable from "../CustomTable/CustomTable";
import { getTransactions } from "../../api";
import TransactionChart from "../TransactionChart/TransactionChart";
import ExpensePieChart from "../ExpenseChart/ExpensePieChart";
import {usePDF} from 'react-to-pdf';
import Report from "../Report/Report";

export default function Dashboard() {
  const { state, dispatch } = useContext(AuthContext);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [data, setData] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const accountId = localStorage.getItem("accountId");
  const [refresh, setRefresh] = useState(false);
  const accountName = localStorage.getItem("accountName");
  
  const { toPDF, targetRef } = usePDF({
    filename: `financial_report_${new Date().toLocaleDateString()}.pdf`,
    resolution: 2,
    page: {
      margin: 20,
      format: 'A4',
      orientation: 'portrait'
    },
    canvas: {
      qualityRatio: 2,
      useCORS: true,
      scale: 2
    },
    onComplete: () => console.log('PDF generation completed')
  });

  const handleDownloadReport = async () => {
    try {
      // Make report visible first
      const reportElement = targetRef.current;
      reportElement.style.position = 'fixed';
      reportElement.style.top = '-9999px';
      reportElement.style.left = '-9999px';
      reportElement.style.opacity = '1';
      reportElement.style.display = 'block';
  
      // Wait for charts to render
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate PDF
      await toPDF();
      
      // Hide report again
      reportElement.style.display = 'none';
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions(accountId);
        setData(response.transactions);
        let income = 0;
        let expenses = 0;
        response.transactions.forEach((transaction) => {
          if (transaction.TransactionType === "Credit") {
            income += Number(transaction.TransactionAmount);
            console.log(income);
          } else {
            expenses += Number(transaction.TransactionAmount);
            console.log(expenses);
          }
        });
        setIncome(income);
        setExpenses(expenses);
        setBalance(income - expenses);
      } catch (err) {
        console.log(err);
      }
    };
    if (accountId) {
      fetchTransactions();
    }
  }, [accountId, refresh]);

  const handleTransactionUpdate = () => {
    setRefresh(!refresh);
  };

  const handleIncomeClick = () => {
    dispatch({ type: "SET_ISINCOMEMODALOPEN", payload: true });
    setShowIncome(true);
  };

  const handleExpenseClick = () => {
    dispatch({ type: "SET_ISEXPENSEMODALOPEN", payload: true });
    setShowExpense(true);
  };

  return (
    <>
      <div className={s.headerRow}>
        <h2>Track Your Expenses</h2>
        <h2>Account: {accountName}</h2>
        <button className={s.downloadButton} onClick={handleDownloadReport}>
          Download Report
        </button>
      </div>
      <div className={s.wrapper}>
        <div className={s.row}>
          <div className={s.balanceCard}>
            <h3>Balance: {balance}Rs</h3>
          </div>
          <div className={s.incomeCard}>
            <h3>Income: {income}Rs</h3>
          </div>
          <div className={s.expenseCard}>
            <h3>Expenses: {expenses}Rs</h3>
          </div>
        </div>
        <div className={s.row}>
          <div className={s.cardButton}>
            <button
              className={s.incomeButton}
              type="submit"
              onClick={handleIncomeClick}
            >
              Add Income
            </button>
          </div>
          <div className={s.cardButton}>
            <button
              className={s.incomeButton}
              type="submit"
              onClick={handleExpenseClick}
            >
              Add Expense
            </button>
          </div>
        </div>

        <div className={s.chartsContainer}>
          <div className={s.chart}>
            <h3>Monthly Income vs Expenses</h3>
            <TransactionChart transactions={data} />
          </div>
          <div className={s.chart}>
            <h3>Expense Distribution</h3>
            <ExpensePieChart transactions={data} />
          </div>
        </div>
      </div>

      {/* Hidden report component for PDF generation */}
      
        <div ref={targetRef} style={{ display: 'none' }}>
          <Report 
            balance={balance}
            income={income}
            expenses={expenses}
            data={data}
          />
        </div>
      {showIncome && <AddIncome onTransactionUpdate={handleTransactionUpdate}></AddIncome>}
      {showExpense && <AddExpense onTransactionUpdate={handleTransactionUpdate}></AddExpense>}
      <CustomTable data={data}></CustomTable>
      <footer className={s.footer}>
                      <p>Personal Finance Management</p>
                      <p>© 2025</p>
      
                  </footer>
    </>
  );
}
