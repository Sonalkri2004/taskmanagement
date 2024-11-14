import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'animate.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" ||
                          (filter === "Completed" && task.completed) ||
                          (filter === "Incomplete" && !task.completed) ||
                          (filter === "High" && task.priority === "High") ||
                          (filter === "Medium" && task.priority === "Medium") ||
                          (filter === "Low" && task.priority === "Low");
    return matchesSearch && matchesFilter;
  });

  const priorityStyles = {
    High: "bg-red-200 text-red-700",
    Medium: "bg-yellow-200 text-yellow-700",
    Low: "bg-green-200 text-green-700",
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white bg-opacity-80 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-2xl min-h-screen flex flex-col gap-6 animate__animated animate__swing">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="w-full max-w-md border border-gray-300 p-3 rounded-full bg-white bg-opacity-60 placeholder-gray-500 text-gray-800 focus:outline-none shadow-md transition-transform duration-300 transform hover:scale-105"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
        {["All", "Completed", "Incomplete", "High", "Medium", "Low"].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-3 md:px-4 py-1 md:py-2 rounded-full ${
              filter === option
                ? `bg-${priorityStyles[option] || 'blue-500'} text-white`
                : "bg-gray-200 text-gray-700"
            } shadow-md text-xs md:text-sm font-semibold transition-transform transform hover:scale-105`}
          >
            {option} {option === "High" || option === "Medium" || option === "Low" ? "Priority" : ""}
          </button>
        ))}
      </div>

      {/* Task Input and Priority */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          className="border p-3 rounded-full bg-white bg-opacity-60 text-gray-700 border-gray-300 shadow-md focus:outline-none"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <input
          type="text"
          className="flex-grow border p-3 rounded-full bg-white bg-opacity-60 placeholder-gray-500 text-gray-800 focus:outline-none border-gray-300 shadow-md"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-white font-bold shadow-md transition-transform duration-300 transform hover:scale-105"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg shadow-lg bg-white bg-opacity-60 backdrop-blur-lg relative border-l-4 ${
                  task.completed ? 'border-green-500' : priorityStyles[task.priority]
                }`}
              >
                <span
                  className={`absolute top-2 right-2 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-md ${
                    priorityStyles[task.priority]
                  }`}
                >
                  {task.priority} Priority
                </span>

                <h3
                  className={`text-lg mt-4 font-semibold ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </h3>

                <div className="flex justify-between items-center mt-4 space-x-2">
                  <button
                    className={`w-full text-xs font-semibold px-4 py-2 rounded-full shadow-md transition-colors duration-200 ${
                      task.completed
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={() => completeTask(index)}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>

                  <button
                    className="w-full text-xs font-semibold bg-red-500 text-white px-4 py-2 rounded-full shadow-md transition-colors duration-200 hover:bg-red-600"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6 animate__animated animate__fadeIn">
            No tasks found. Start by adding a task.
          </p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskManager;
