import React from 'react';
import Countdown from './Countdown';

function DoneColumn({ tasks, removeTask, moveTaskToColumn }) {
  const handleCompleteTask = (taskId) => {
    removeTask(taskId, 'done');
    alert("Congratulations! You have completed a task!");
  };

  return (
    <div className="column done">
      <h2>Done</h2>
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
              <button onClick={() => moveTaskToColumn(task.id, 'done', 'todo')}>Move to To Do</button>
              <button onClick={() => moveTaskToColumn(task.id, 'done', 'inProgress')}>Move to In Progress</button>
              <button onClick={() => handleCompleteTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoneColumn;
