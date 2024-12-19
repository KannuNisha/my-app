import './App.css';


import React, { useState } from 'react';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]); 

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

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
          <li key={index}>{habit}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;