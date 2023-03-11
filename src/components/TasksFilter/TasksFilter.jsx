import React from 'react';
import propTypes from 'prop-types';

export default class TaskFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const buttons = this.buttons.map(({ name, label }) => {
      const { filter, onFilter } = this.props;
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

    return <ul className="filters">{buttons}</ul>;
  }
}

TaskFilter.defaultProps = {
  filter: 'all',
  onFilter: () => {},
};

TaskFilter.propTypes = {
  filter: propTypes.string,
  onFilter: propTypes.func,
};
