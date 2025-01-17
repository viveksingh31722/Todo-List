import React, { useState } from 'react';
import axios from 'axios';

export default function Create({ fetchTodos }) {
  const [task, setTask] = useState('');

  const handleAdd = async () => {
    try {
      const result = await axios.post('http://localhost:3000/add', { task: task });
      console.log(result);
      fetchTodos(); // Fetch updated todos after adding a new task
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='create_form'>
      <input
        type="text"
        className="input"
        placeholder="Enter the task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" className="button" onClick={handleAdd}>Add</button>
    </div>
  );
}
