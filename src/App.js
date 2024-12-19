import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (e) {
        console.error("Failed to parse saved habits", e);
        setHabits([]);
      }
    }
  }, [])

  useEffect(() => {
    if (habits.length > 0) {
    localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits]);

  const addHabit = (habitText) => {
    setHabits([...habits,
    { text: habitText, completed: false }
    ]);
  };

  const toggleHabit = (index) => {
    setHabits(
      habits.map((habit, i) =>
        i === index ? { ...habit, completed: !habit.completed } : habit)
    );
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  }

  const clearAllHabits = () => {
    setHabits([]);
  }

  return (
    <div className="App">
      <header className="App header">
        <h1>Welcome to My abit Tracker App</h1>
        <p>Start tracking your habits today!</p>
      </header>

      <div>
        <input
          type="text"
          placeholder="New Habit"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addHabit(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>

      <ul>
        {habits.map((habit, index) => (
          <li key={index}
            onClick={() => toggleHabit(index)}
            style={{ textDecoration: habit.completed ? 'line-through' : 'none' }}
          >
            {habit.text}
            <button onClick={(e) => {
              e.stopPropagation();
              deleteHabit(index);
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={clearAllHabits}>Clear All</button>
    </div>
  );
}
export default App;