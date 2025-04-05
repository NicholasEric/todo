// src/components/TaskItem.jsx
import React from 'react';

const TaskItem = ({ task, deleteTask }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {task.text}
      <button className="btn btn-danger" onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
