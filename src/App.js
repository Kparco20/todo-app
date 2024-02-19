import React, { useState } from 'react';
import './App.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setNewTask('');
    setNewDeadline('');
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      if (editingTask !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingTask].name = newTask;
        updatedTasks[editingTask].deadline = newDeadline;
        setTasks(updatedTasks);
        closeModal();
      } else {
        setTasks([...tasks, { name: newTask, status: 'Pending', deadline: newDeadline }]);
        closeModal();
      }
    }
  };

  const editTask = (index) => {
    setEditingTask(index);
    setNewTask(tasks[index].name);
    setNewDeadline(tasks[index].deadline || '');
    openModal();
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    closeModal();
  };

  const updateStatus = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="todo-container">
        <h1>Todo List</h1>
        <div>
          <button className="add-task" onClick={openModal}>
            {editingTask !== null ? 'Edit Task' : 'Add Task'}
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className="task">{task.name}</div>
              <div className="status">Status: {task.status}</div>
              <div className="deadline">Deadline: {task.deadline || 'No deadline'}</div>
              <div className="buttons">
                <button className="edit" onClick={() => editTask(index)}>Edit</button>
                <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
              </div>
              <select
                value={task.status}
                onChange={(e) => updateStatus(index, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </li>
          ))}
        </ul>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>{editingTask !== null ? 'Edit Task' : 'Add Task'}</h2>
              <input
                type="text"
                placeholder="Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <input
                type="text"
                placeholder="Deadline"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
              />
              <button onClick={addTask}>
                {editingTask !== null ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
