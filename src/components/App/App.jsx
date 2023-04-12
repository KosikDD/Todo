import React, { useState } from 'react';

import './App.css';
import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

function counter() {
  let maxId = 1;
  return () => maxId++;
}

const maxId = counter();

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [filter, setOnFilter] = useState('all');

  const createTask = (label, min = 0, sec = 0) => {
    return {
      label,
      min: min,
      sec: sec,
      completed: false,
      editing: false,
      time: new Date(),
      id: maxId(),
    };
  };

  const addTask = (label, min, sec) => {
    setTodoData((todoData) => {
      return [createTask(label, min, sec), ...todoData];
    });
  };

  const updateTask = (id, min, sec) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => {
        return el.id === id;
      });

      const oldItem = todoData[index];
      if (typeof oldItem === 'undefined') return todoData;
      const newItem = { ...oldItem, min: min, sec: sec };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return newArray;
    });
  };

  const deleteTask = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  const onToggleDone = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
    });
  };

  const onFilter = (filter) => {
    setOnFilter(filter);
  };

  const onClear = () => {
    setTodoData((todoData) => {
      return todoData.filter((el) => !el.completed);
    });
  };

  const getRender = () => {
    switch (filter) {
      case 'all':
        return todoData;
      case 'active':
        return todoData.filter((el) => !el.completed);
      case 'completed':
        return todoData.filter((el) => el.completed);
      default:
        return todoData;
    }
  };

  const leftCount = todoData.filter((el) => !el.completed).length;

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList todos={getRender()} onDeleted={deleteTask} onToggleDone={onToggleDone} onUpdate={updateTask} />
        <Footer leftCount={leftCount} filter={filter} onFilter={onFilter} onClear={onClear} />
      </section>
    </section>
  );
};

export default App;
