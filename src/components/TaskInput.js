// TaskInput.js
import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [column, setColumn] = useState('todo');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');

  const handleAddTask = () => {
    if (taskName && deadlineDate) {

      const deadline = `${deadlineDate}T${deadlineTime || '23:59'}`;
      addTask(taskName, column, deadline);
      setTaskName('');
      setDeadlineDate('');
      setDeadlineTime('');
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Input task name"
      />
      <input
        type="date"
        value={deadlineDate}
        onChange={(e) => setDeadlineDate(e.target.value)}
      />
      <input
        type="time"
        value={deadlineTime}
        onChange={(e) => setDeadlineTime(e.target.value)}
      />
      <select value={column} onChange={(e) => setColumn(e.target.value)}>
        <option value="todo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={handleAddTask}>Add New Task</button>
    </div>
  );
}

export default TaskInput;
