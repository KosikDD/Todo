import React from 'react';
import propTypes from 'prop-types';

import Task from '../Task';

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map((item) => {
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
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
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
