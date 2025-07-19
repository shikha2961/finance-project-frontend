import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function ExpensePieChart({ transactions }) {
    // Process data for expense categories
    const processData = () => {
        const categories = {};
        
        transactions
            .filter(t => t.TransactionType === 'Debit')
            .forEach(transaction => {
                const category = transaction.categoryName;
                categories[category] = (categories[category] || 0) + Number(transaction.TransactionAmount);
            });
            
        return Object.keys(categories).map(category => ({
            name: category,
            value: categories[category]
        }));
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={processData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}Rs`}
                >
                    {processData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}