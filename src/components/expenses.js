  const categories = [import React, { useState, useEffect } from 'react';
const ExpenseTracker = () => {
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Select Category');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

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
  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`https://ecommerce-ad7ec-default-rtdb.firebaseio.com/Expense/${id}.json`, {
        method: "DELETE"
      });

      if (response.ok) {
        setExpenses(preExpenses => preExpenses.filter(item => item.id !== id));
      } else {
        console.error("Error deleting movie from Firebase");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEditExpense = (id) => {
    if (id) {
      const expenseToEdit = expenses.find((item) => item.id === id);
  
      if (expenseToEdit) {
        setExpense(expenseToEdit.expense);
        setDescription(expenseToEdit.description);
        setCategory(expenseToEdit.category);
  
        setEditingExpense(id);
      }
    } else if (expense.trim() !== '' && description.trim() !== '' && category !== 'Select Category' && editingExpense) {
      const updatedExpenses = expenses.map((item) =>
        item.id === editingExpense
          ? {
              id: item.id,
              expense,
              description,
              category,
            }
          : item
      );
     fetch(`https://ecommerce-ad7ec-default-rtdb.firebaseio.com/Expense/${editingExpense}.json`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expense,
          description,
          category,
        })
      })
        .then((response) => {
          if (response.ok) {
            
            setExpenses(updatedExpenses);
            setExpense('');
            setDescription('');
            setCategory('Select Category');
            setEditingExpense(null);
          } else {
            throw new Error('Failed to update expense');
          }
        })
        .catch((error) => {
          console.error('Error updating expense:', error);
        });
    }
  };
  
  const handleAddExpense = () => {
    if (expense.trim() !== '' && description.trim() !== '' && category !== 'Select Category') {
      const newExpense = {
        expense,
        description,
        category,
      };
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
                <button onClick={() => handleDeleteExpense(item.id)}>Delete</button>
                <button onClick={() => handleEditExpense(item.id)}>Edit</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default ExpenseTracker;
