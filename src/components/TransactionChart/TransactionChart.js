import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TransactionChart({ transactions }) {
    // Process data for the chart
    const processData = () => {
        const monthlyData = {};
        
        transactions.forEach(transaction => {
            const date = new Date(transaction.TransactionDate);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            
            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = { income: 0, expenses: 0 };
            }
            
            if (transaction.TransactionType === 'Credit') {
                monthlyData[monthYear].income += Number(transaction.TransactionAmount);
            } else {
                monthlyData[monthYear].expenses += Number(transaction.TransactionAmount);
            }
        });
        
        return Object.keys(monthlyData).map(month => ({
            month,
            Income: monthlyData[month].income,
            Expenses: monthlyData[month].expenses
        }));
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#4CAF50" />
                <Bar dataKey="Expenses" fill="#f44336" />
            </BarChart>
        </ResponsiveContainer>
    );
}