import React from 'react';
import propTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = (props) => {
  const { leftCount, filter, onFilter, onClear } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{leftCount} items left</span>
      <TasksFilter filter={filter} onFilter={onFilter} />
      <button className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  leftCount: 0,
  filter: 'all',
  onFilter: () => {},
  onClear: () => {},
};

Footer.propTypes = {
  leftCount: propTypes.number,
  filter: propTypes.string,
  onFilter: propTypes.func,
  onClear: propTypes.func,
};

export default Footer;
