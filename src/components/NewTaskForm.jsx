import React, { useState } from 'react';
import '../index.css';
import PropTypes from 'prop-types';

export default function NewTaskForm(props) {
  const [value, setValue] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (event) => {
    const { addTodo } = props;
    event.preventDefault();
    addTodo(value, minutes, seconds);
    setValue('');
    setMinutes('');
    setSeconds('');
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'task') {
      setValue(value.trim());
    } else if (name === 'minutes') {
      setMinutes(Number(value));
    } else if (name === 'seconds') {
      setSeconds(Number(value));
    }
  };

  return (
    /* eslint-disable prettier/prettier */
    <header className="header">
      <h1>Todos</h1>
      <form
        id="form"
        className="new-todo-form"
        onSubmit={handleSubmit}
      >
        <input
          name="task"
          type="text"
          form="form"
          className="new-todo"
          value={value}
          placeholder="Task"
          onChange={onInputChange}
          required
        />
        <input
          name="minutes"
          type="number"
          min={0}
          form="form"
          className="new-todo-form__timer"
          value={minutes}
          placeholder="Min"
          onChange={onInputChange}
          required
        />
        <input
          name="seconds"
          type="number"
          min={1}
          max={59}
          form="form"
          className="new-todo-form__timer"
          value={seconds}
          placeholder="Sec"
          onChange={onInputChange}
          required
        />
        <button
          type="submit"
          aria-label="Add new todo"
        />
      </form>
    </header>
    /* eslint-enable prettier/prettier */
  );
}

NewTaskForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
