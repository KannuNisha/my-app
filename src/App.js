import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  // const [quote, setQuote] = useState("");

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
    if (habitText.trim()) {

      setHabits([...habits,
      { text: habitText, completed: false }
      ]);
      alert("Habit added successfuly!");
    } else {
      alert("Habit can not be empty!")
    }
  };

  // const fetchQuote = () => {
  //   fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setQuote(`${data.data.quote} - ${data.data.author}`);
  //     })
  //     .catch((error) => console.error("Error fetching quote:", error));
  // };

  const toggleHabit = (index) => {
    setHabits(
      habits.map((habit, i) =>
        i === index ? { ...habit, completed: !habit.completed } : habit)
    );
    // if (!habits[index].completed) {
    //   fetchQuote();
    // }
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
    alert("Habit deleted successfully!");
  }

  const clearAllHabits = () => {
    setHabits([]);
  }

  const startEdidting = (index) => {
    setEditingIndex(index);
    setEditText(habits[index].text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      const updatedHabits = habits.map((habit, index) =>
        index === editingIndex ? { ...habit, text: editText } : habit
      );
      setHabits(updatedHabits);
      setEditingIndex(null);
      setEditText("");
      alert("Habit updated successfully!");
    } else {
      alert("Habit can not be empty!")
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  }

  return (
    <div className="App">
      <header className="App header">
        <h1>Welcome to My Habit Tracker App</h1>
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
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                {habit.text}
                <button onClick={(e) => { e.stopPropagation(); deleteHabit(index); }}>Delete</button>
                <button onClick={(e) => { e.stopPropagation(); startEdidting(index); }}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <button onClick={clearAllHabits}>Clear All</button>

      {/* {quote && (
        <div className="quote">
          <p>{quote}</p>
        </div>
      )} */}
    </div>
  );
}
export default App;