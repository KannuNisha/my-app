import React, { useState } from 'react';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]); 

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
          style={{ textDecoration: habit.completed ? 'line-through' : 'none'}}
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
    </div>
  );
}
export default App;