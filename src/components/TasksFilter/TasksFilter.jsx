import React from 'react';
import propTypes from 'prop-types';

import './TasksFilter.css';
const TaskFilter = ({ filter, onFilter }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const button = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button
          className={clazz}
          onClick={() => {
            onFilter(name);
          }}
        >
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{button}</ul>;
};

export default TaskFilter;

TaskFilter.defaultProps = {
  filter: 'all',
  onFilter: () => {},
};

TaskFilter.propTypes = {
  filter: propTypes.string,
  onFilter: propTypes.func,
};
