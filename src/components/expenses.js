import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Select Category');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const newExpense = {
        expense,
        description,
        category,
      };

      // Send the data to a server using the fetch API with POST
      fetch('https://ecommerce-ad7ec-default-rtdb.firebaseio.com/Expense.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to add expense');
          }
        })
        .then(() => {
          setExpense('');
          setDescription('');
          setCategory('Select Category');
          console.log('Expense added to the server');
        })
        .catch((error) => {
          console.error('Error adding expense:', error);
        });
    }
  };

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch('https://ecommerce-ad7ec-default-rtdb.firebaseio.com/Expense.json');
        const data = await response.json();
        if (data) {
          const Array = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setExpenses(Array);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchExpenses();
  }, []);

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
        {loading ? (
          <p>Loading expenses...</p>
        ) : (
          <ul>
            {expenses.map((item, index) => (
              <li key={index}>
                <strong>Expense:</strong> {item.expense},&nbsp;
                <strong>Description:</strong> {item.description},&nbsp;
                <strong>Category:</strong> {item.category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
