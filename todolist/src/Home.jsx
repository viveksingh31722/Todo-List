import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import Trash Icon from react-icons

export default function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const result = await axios.get("http://localhost:3000/get");
      setTodos(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (index) => {
    // You can update the todo state to reflect the checkbox change (e.g., marking as completed)
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id)); // Remove deleted todo from state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on initial render
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <Create fetchTodos={fetchTodos} /> {/* Pass fetchTodos as a prop */}
      {todos.length === 0 ? (
        <div>
          <h2>No Records</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div
            key={todo._id}
            className="task"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(index)} // Toggle the checkbox state
            />
            <p
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                margin: "0 10px",
              }}
            >
              {todo.task}
            </p>
            <FaTrash
              onClick={() => handleDelete(todo._id)} // Delete the todo
              style={{ cursor: "pointer", color: "red" }}
            />
          </div>
        ))
      )}
    </div>
  );
}
