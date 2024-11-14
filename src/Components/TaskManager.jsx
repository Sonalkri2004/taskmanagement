import React, { useState, useEffect } from 'react';
import 'animate.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("title");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

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

  const completeTask = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortCriteria === "completion") {
        return a.completed - b.completed;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 animate__animated animate__fadeInUp animate__faster">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-700">
        Task Manager
      </h2>

      <input
        type="text"
        className="border p-2 w-full rounded mb-4 text-gray-700"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex mb-4 gap-2">
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          className="border p-2 rounded text-gray-700"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="text"
          className="border p-2 w-full rounded text-gray-700"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <span>Sort by:</span>
        <select
          onChange={(e) => setSortCriteria(e.target.value)}
          className="border p-2 rounded text-gray-700"
          value={sortCriteria}
        >
          <option value="title">Title</option>
          <option value="priority">Priority</option>
          <option value="completion">Completion Status</option>
        </select>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center mb-2 p-3 rounded-lg border transition duration-300 animate__animated animate__fadeInUp animate__faster ${
              task.completed ? 'bg-green-200' : 'bg-white'
            } ${
              task.priority === 'High' ? 'border-red-500' : task.priority === 'Medium' ? 'border-yellow-500' : 'border-blue-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`cursor-pointer ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-700'
                }`}
              >
                {task.title} ({task.priority})
              </span>
              <button
                className={`px-2 py-1 rounded text-white ${
                  task.completed ? 'bg-green-500' : 'bg-gray-500 hover:bg-green-600'
                }`}
                onClick={() => completeTask(index)}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
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
