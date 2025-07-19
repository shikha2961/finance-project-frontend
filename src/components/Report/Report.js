import s from './Report.module.scss';
import CustomTable from '../CustomTable/CustomTable';
import TransactionChart from '../TransactionChart/TransactionChart';
import ExpensePieChart from '../ExpenseChart/ExpensePieChart';

export default function Report({ balance, income, expenses, data }) {
  return (
    <div className={s.reportContainer}>
      <h1>Financial Report</h1>
      <p className={s.date}>Generated on: {new Date().toLocaleDateString()}</p>
      
      <div className={s.summary}>
        <div className={s.summaryItem}>
          <h3>Balance</h3>
          <p>{balance}Rs</p>
        </div>
        <div className={s.summaryItem}>
          <h3>Total Income</h3>
          <p>{income}Rs</p>
        </div>
        <div className={s.summaryItem}>
          <h3>Total Expenses</h3>
          <p>{expenses}Rs</p>
        </div>
      </div>

      <div className={s.chartsSection}>
        <div className={s.chartWrapper}>
          <h3>Monthly Income vs Expenses</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <TransactionChart transactions={data} />
          </div>
        </div>
        <div className={s.chartWrapper}>
          <h3>Expense Distribution</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ExpensePieChart transactions={data} />
          </div>
        </div>
      </div>

      <div className={s.transactions}>
        <h2>Transaction History</h2>
        <CustomTable data={data} />
      </div>
    </div>
  );
}