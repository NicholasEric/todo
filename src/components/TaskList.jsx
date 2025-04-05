// src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <ul className="list-group">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
};

export default TaskList;
