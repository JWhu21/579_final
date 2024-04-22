// InProgressColumn.js
import React from 'react';
import Countdown from './Countdown';

function InProgressColumn({ tasks, removeTask, moveTaskToColumn }) {
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
    <div className="column in-progress">
      <h2>In Progress</h2>
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
            <button onClick={() => removeTask(task.id, 'inProgress')}>Delete</button>
            <button onClick={() => moveTaskToColumn(task.id, 'inProgress', 'todo')}>Move to To Do</button>
            <button onClick={() => moveTaskToColumn(task.id, 'inProgress', 'done')}>Move to Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InProgressColumn;
