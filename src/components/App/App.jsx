import React, { Component } from 'react';

import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [this.createTask('Drink Coffee'), this.createTask('Build Awesome App'), this.createTask('Go to GYM')],
    filter: 'all', // all, active, completed
  };

  createTask(label) {
    return {
      label,
      completed: false,
      editing: false,
      time: new Date(),
      id: this.maxId++,
    };
  }

  addTask = (label) => {
    this.setState(({ todoData }) => {
      const newTask = {
        label,
        completed: false,
        editing: false,
        time: new Date(),
        id: this.maxId++,
      };
      return { todoData: [newTask, ...todoData] };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
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
          <TaskList todos={visibleTask} onDeleted={this.deleteTask} onToggleDone={this.onToggleDone} />
          <Footer leftCount={leftCount} filter={filter} onFilter={this.onFilter} onClear={this.onClear} />
        </section>
      </section>
    );
  }
}
