import React from 'react';
import propTypes from 'prop-types';

import './TaskList.css';
import Task from '../Task';

const TaskList = ({ todos, onDeleted, onToggleDone, onUpdate }) => {
  return (
    <ul className="todo-list">
      {todos.map((item) => {
        const { id } = item;

        return (
          <Task
            {...item}
            key={id}
            onDeleted={() => {
              onDeleted(id);
            }}
            onToggleDone={() => {
              onToggleDone(id);
            }}
            onUpdate={(min, sec) => {
              onUpdate(id, min, sec);
            }}
          />
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  todos: propTypes.arrayOf(propTypes.object),
  onDeleted: propTypes.func,
  onToggleDone: propTypes.func,
};

export default TaskList;
