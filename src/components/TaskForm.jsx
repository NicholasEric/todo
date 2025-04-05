// src/components/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleAddClick = () => {
    if (!taskText) return;
    addTask(taskText);
    setTaskText('');
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={taskText}
        onChange={handleInputChange}
        placeholder="Enter a task"
      />
      <button className="btn btn-primary" onClick={handleAddClick}>Add Task</button>
    </div>
  );
};

export default TaskForm;
