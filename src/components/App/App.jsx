import React, { Component } from 'react';

import './App.css';
import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [{ ...this.createTask('Submit for review'), completed: true }],
    filter: 'all', // all, active, completed
    deletedItems: false,
  };

  createTask(label, min = 0, sec = 0) {
    return {
      label,
      min: min,
      sec: sec,
      completed: false,
      editing: false,
      time: new Date(),
      id: this.maxId++,
    };
  }

  addTask = (label, min, sec) => {
    this.setState(({ todoData }) => {
      return { todoData: [this.createTask(label, min, sec), ...todoData] };
    });
  };

  updateTask = (id, min, sec) => {
    if (this.state.deletedItems) {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const updatedTask = { ...todoData[idx], min: min, sec: sec };
        return {
          todoData: [...todoData.slice(0, idx), updatedTask, ...todoData.slice(idx + 1)],
        };
      });
    } else {
      this.setState({ deletedItems: true });
    }
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
        deletedItems: false,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      // 1. update data
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };

      // 2. construct new array
      return {
        todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
      };
    });
  };

  onFilter = (filter) => {
    this.setState({ filter });
  };

  onClear = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => !el.completed),
        deletedItems: false,
      };
    });
  };

  filter = () => {
    switch (this.state.filter) {
      case 'all':
        return this.state.todoData;
      case 'active':
        return this.state.todoData.filter((el) => !el.completed);
      case 'completed':
        return this.state.todoData.filter((el) => el.completed);
      default:
        return this.state.todoData;
    }
  };

  render() {
    const visibleTask = this.filter();
    const { todoData, filter } = this.state;
    const leftCount = todoData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            todos={visibleTask}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onUpdate={this.updateTask}
          />
          <Footer leftCount={leftCount} filter={filter} onFilter={this.onFilter} onClear={this.onClear} />
        </section>
      </section>
    );
  }
}
