import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';

import './Task.css';

const Task = (props) => {
  const { label, onToggleDone, onDeleted, completed, time, min, sec } = props;
  const [pause, setPause] = useState(false);
  const [timer, setTimer] = useState(min * 60 + Number(sec));

  const timerCreated = formatDistanceToNow(time, {
    includeSeconds: true,
    addSuffix: true,
  });

  const timerRun = () => {
    if (!pause)
      setTimer((timer) => {
        return timer - 1;
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      timerCreated;
      timerRun();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [pause, timer]);

  const timerSet = () => {
    if (timer < 0) return '00:00';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  const pauseTimer = () => {
    setPause(true);
  };

  const startTimer = () => {
    setPause(false);
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
            {timerSet()}
          </span>
          <span className="created">created {timerCreated}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    </li>
  );
};

export default Task;

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
