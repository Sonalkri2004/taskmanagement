import React, { useState, useEffect } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { title: newTask, completed: false, priority }
      ]);
      setNewTask("");
      setPriority("Medium");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };



  return (
    <div className="w-full max-w-md bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
      {/* Task Input and Priority Selection */}
      <div className="flex mb-4">
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          className="border p-2 rounded-l mr-2"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r"
          onClick={addTask}
        >
          Add
        </button>
      </div>

     {/* List of tasks */}
     <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
            <button
              className="text-red-500"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
