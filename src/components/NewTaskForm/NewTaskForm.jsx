import React, { Component } from 'react';
import propTypes from 'prop-types';

import './NewTaskForm.css';
export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', valuemin: '', valuesec: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    const { value, valuemin, valuesec } = this.state;
    if (valuesec < 10) {
      this.props.addTask(value, valuemin, `0${valuesec}`);
    } else {
      this.props.addTask(value, valuemin, valuesec);
    }
    event.preventDefault();
    this.setState({ value: '', valuemin: '', valuesec: '' });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit} className="new-todo-form">
          <input
            name="value"
            type="text"
            value={this.state.value}
            className="new-todo"
            placeholder="Task"
            onChange={this.handleChange}
            required={true}
            pattern="^[^\s]+(\s.*)?$"
            autoFocus
          ></input>
          <input
            name="valuemin"
            type="number"
            value={this.state.valuemin}
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.handleChange}
            required={true}
            pattern="[0-9]{,3}"
            min="0"
            max={999}
            autoFocus
          ></input>
          <input
            name="valuesec"
            type="number"
            value={this.state.valuesec}
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.handleChange}
            required={true}
            pattern="[1-9]{2}"
            max={59}
            min="0"
            autoFocus
          ></input>
          <button></button>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  addTask: () => {},
};

NewTaskForm.propsTypes = {
  addTask: propTypes.func,
};
