// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskInput from './components/TaskInput';
import ToDoColumn from './components/ToDoColumn';
import InProgressColumn from './components/InProgressColumn';
import DoneColumn from './components/DoneColumn';

function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = (task, column, deadline) => {
    const newTask = {
      id: `task-${Date.now()}`,
      text: task,
      deadline: deadline || ''
    };
    const newTasks = { ...tasks, [column]: [...tasks[column], newTask] };
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const removeTask = (taskId, column) => {
    const newTasks = { 
      ...tasks,
      [column]: tasks[column].filter(task => task.id !== taskId)
    };
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };


  const moveTask = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return [sourceClone, destClone];
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceTasks = tasks[source.droppableId];
      const destTasks = tasks[destination.droppableId];

      const [newSourceTasks, newDestTasks] = moveTask(
        sourceTasks,
        destTasks,
        source,
        destination
      );

      setTasks({
        ...tasks,
        [source.droppableId]: newSourceTasks,
        [destination.droppableId]: newDestTasks
      });

      saveTasksToLocalStorage({
        ...tasks,
        [source.droppableId]: newSourceTasks,
        [destination.droppableId]: newDestTasks
      });
    }
  };

  const moveTaskToColumn = (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find(task => task.id === taskId);
    if (!taskToMove) {
      return;
    }
  
    const updatedSourceColumnTasks = tasks[fromColumn].filter(task => task.id !== taskId);
    const updatedTargetColumnTasks = [...tasks[toColumn], taskToMove];
  
    const newTasks = {
      ...tasks,
      [fromColumn]: updatedSourceColumnTasks,
      [toColumn]: updatedTargetColumnTasks,
    };
  
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <TaskInput addTask={addTask} />
        <div className="columns-container">

          <ToDoColumn tasks={tasks.todo} removeTask={removeTask} moveTaskToColumn={moveTaskToColumn} />
          <InProgressColumn tasks={tasks.inProgress} removeTask={removeTask} moveTaskToColumn={moveTaskToColumn} />
          <DoneColumn tasks={tasks.done} removeTask={removeTask} moveTaskToColumn={moveTaskToColumn} />

        </div>
      </div>
    </DragDropContext>
  );
}

export default App;

