import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';
import '../index.css';

export default function TaskList(props) {
  const { 
    todos,
    deleteTodo,
    editTodo,
    changeCheck,
    tickCallback,
  } = props;
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        /* eslint-disable prettier/prettier */
        <Task
          key={todo.id}
          todo={todo}
          changeCheck={changeCheck}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          tickCallback={tickCallback}
        />
        /* eslint-enable prettier/prettier */
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      task: PropTypes.string,
      completed: PropTypes.bool,
      isEditing: PropTypes.bool,
      date: PropTypes.instanceOf(Date),
      // eslint-disable-next-line prettier/prettier
    }),
  ),
  changeCheck: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
