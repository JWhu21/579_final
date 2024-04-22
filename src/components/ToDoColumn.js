// ToDoColumn.js
import React from 'react';
import Countdown from './Countdown';

function ToDoColumn({ tasks, removeTask, moveTaskToColumn}) {
  const renderDeadline = (deadline) => {
    if (!deadline) return 'No Deadline';
    const timeLeft = new Date(deadline).getTime() - new Date().getTime();
    if (timeLeft <= 0) {
      return 'Passed Deadline';
    }
    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    return ` , ${daysLeft} days left`;
  };

  return (
    <div className="column todo">
      <h2>To Do</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-text">{task.text}</span>
            <br></br>
            <span className="countdown">
            <Countdown deadline={task.deadline} />
            </span>
            <br></br>
            <div className="task-buttons">
            <button onClick={() => removeTask(task.id, 'todo')}>Delete</button>
            <button onClick={() => moveTaskToColumn(task.id, 'todo', 'inProgress')}>Move to In Progress</button>
            <button onClick={() => moveTaskToColumn(task.id, 'todo', 'done')}>Move to Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoColumn;
