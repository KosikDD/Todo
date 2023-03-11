import React, { Component } from 'react';
import propTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { timeNow: Date.now() };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ timeNow: Date.now() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { label, onToggleDone, onDeleted, completed, time } = this.props;
    const timerCreated = formatDistanceToNow(time, {
      includeSeconds: true,
      addSuffix: true,
    });
    let classNames = '';

    if (completed) {
      classNames += 'completed';
    } else {
      classNames = '';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone}></input>
          <label>
            <span className="description" onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">created {timerCreated}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  label: '',
  onToggleDone: () => {},
  onDeleted: () => {},
  completed: false,
};

Task.propTypes = {
  label: propTypes.string,
  onToggleDone: propTypes.func,
  onDeleted: propTypes.func,
  completed: propTypes.bool,
};
