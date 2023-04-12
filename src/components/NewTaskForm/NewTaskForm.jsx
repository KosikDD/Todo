import React, { useState } from 'react';
import propTypes from 'prop-types';

import './NewTaskForm.css';
const NewTaskForm = ({ addTask }) => {
  const [value, setValue] = useState('');
  const [valuemin, setValuemin] = useState('');
  const [valuesec, setValuesec] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'value') {
      setValue(event.target.value);
    } else if (event.target.name === 'valuemin') {
      setValuemin(event.target.value);
    } else if (event.target.name === 'valuesec') {
      setValuesec(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    if (valuesec < 10) {
      addTask(value, valuemin, `0${valuesec}`);
    } else {
      addTask(value, valuemin, valuesec);
    }
    event.preventDefault();
    setValue('');
    setValuemin('');
    setValuesec('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit} className="new-todo-form">
        <input
          name="value"
          type="text"
          value={value}
          className="new-todo"
          placeholder="Task"
          onChange={handleChange}
          required={true}
          pattern="^[^\s]+(\s.*)?$"
          autoFocus
        ></input>
        <input
          name="valuemin"
          type="number"
          value={valuemin}
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={handleChange}
          required={true}
          pattern="[0-9]{,3}"
          min="0"
          max={999}
          autoFocus
        ></input>
        <input
          name="valuesec"
          type="number"
          value={valuesec}
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={handleChange}
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
};

export default NewTaskForm;

NewTaskForm.defaultProps = {
  addTask: () => {},
};

NewTaskForm.propsTypes = {
  addTask: propTypes.func,
};
