import React, { Component } from 'react';
import propTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';

import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    if (props.sec === 0) {
      this.state = {
        timeNow: Date.now(),
        min: props.min,
        sec: `0${props.sec}`,
        convert: false,
        pause: false,
        closetozero: false,
      };
    } else {
      this.state = {
        timeNow: Date.now(),
        min: props.min,
        sec: props.sec,
        convert: false,
        pause: false,
        closetozero: false,
      };
    }
  }

  componentDidMount() {
    if ((Number(this.state.min) === 0) & (Number(this.state.sec) === 0)) {
      this.interval = setInterval(() => this.setState({ timeNow: Date.now(), pause: true }), 1000);
    } else if ((this.state.min > 0) & (Number(this.state.sec) === 0)) {
      this.interval = setInterval(() => this.setState({ timeNow: Date.now(), convert: true }), 1000);
    } else if ((this.state.sec <= 10) & (this.state.sec > 0)) {
      this.interval = setInterval(() => this.setState({ timeNow: Date.now(), sec: `0${this.state.sec - 1}` }), 1000);
    } else {
      this.interval = setInterval(() => this.setState({ timeNow: Date.now(), sec: this.state.sec - 1 }), 1000);
    }
  }

  componentDidUpdate() {
    if (this.state.pause) {
      clearInterval(this.interval);
    } else {
      if (this.state.convert) {
        clearInterval(this.interval);
        this.setState({ min: this.state.min - 1, sec: 59, convert: false });
        this.interval = setInterval(
          () => this.setState({ timeNow: Date.now(), sec: this.state.sec - 1, closetozero: false }),
          1000
        );
      } else if ((this.state.min > 0) & (Number(this.state.sec) === 0)) {
        clearInterval(this.interval);
        this.interval = setInterval(
          () => this.setState({ timeNow: Date.now(), sec: `0${this.state.sec}`, convert: true, closetozero: false }),
          1000
        );
      } else if ((Number(this.state.sec) <= 10) & (Number(this.state.sec) > 0) & !this.state.closetozero) {
        clearInterval(this.interval);
        this.interval = setInterval(
          () => this.setState({ timeNow: Date.now(), sec: `0${this.state.sec - 1}`, closetozero: true }),
          1000
        );
      } else if ((Number(this.state.min) === 0) & (Number(this.state.sec) === 0)) {
        clearInterval(this.interval);
      }
    }
  }

  componentWillUnmount() {
    this.props.onUpdate(Number(this.state.min), Number(this.state.sec), this.state.ondelet);
    clearInterval(this.interval);
  }

  render() {
    const { label, onToggleDone, onDeleted, completed, time } = this.props;
    const timerCreated = formatDistanceToNow(time, {
      includeSeconds: true,
      addSuffix: true,
    });

    const pauseTimer = () => {
      this.setState({ pause: true });
    };

    const startTimer = () => {
      this.setState({ pause: false });
    };

    const onCheck = () => {
      if (!completed) {
        pauseTimer();
        onToggleDone();
      } else {
        startTimer();
        onToggleDone();
      }
    };

    const onDone = (event) => {
      if (!completed) {
        pauseTimer();
        onToggleDone();
        event.preventDefault();
      } else {
        startTimer();
        event.preventDefault();
        onToggleDone();
      }
    };

    return (
      <li className={classNames({ completed: completed })}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onCheck}></input>
          <label>
            <div className="label">
              <span className="description" onClick={onDone}>
                {label}
              </span>
            </div>
            <span className="timer">
              <button className="icon icon-play" onClick={startTimer}></button>
              <button className="icon icon-pause" onClick={pauseTimer}></button>
              {this.state.min}:{this.state.sec}
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
