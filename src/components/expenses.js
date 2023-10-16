import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Select Category');
  const [expenses, setExpenses] = useState([]);

  const categories = [
    'Food',
    'Transportation',
    'Housing',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Education',
    'Other',
  ];

  const handleAddExpense = () => {
    if (expense.trim() !== '' && description.trim() !== '' && category !== 'Select Category') {
      setExpenses([
        ...expenses,
        {
          expense,
          description,
          category,
        },
      ]);
      setExpense('');
      setDescription('');
      setCategory('Select Category');
    }
  };

  return (
    <div>
      <h1>ADD YOUR EXPENSES</h1>
      <div>
        <input
          type="text"
          placeholder="Expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="Select Category">
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div>
        <h2>Expenses:</h2>
        <ul>
          {expenses.map((item, index) => (
            <li key={index}>
              <strong>Expense:</strong> {item.expense},&nbsp;
              <strong>Description:</strong> {item.description},&nbsp;
              <strong>Category:</strong> {item.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
