/* eslint-disable prettier/prettier */
import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';
import TasksFilter from './TasksFilter';

export default function Footer(props) {
  const {
    clearCompleted,
    lefts,
    filter,
    changeFilter,
  } = props;
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${lefts} items left`}
      </span>
      <TasksFilter filter={filter} changeFilter={changeFilter} />
      <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  lefts: 0,
  filter: 'All',
};

Footer.propTypes = {
  lefts: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};
