import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';

export default function TasksFilter(props) {
  const { filter, changeFilter } = props;
  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={() => changeFilter('All')} className={filter === 'All' ? 'selected' : null}>
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => changeFilter('Active')}
          className={filter === 'Active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => changeFilter('Completed')}
          className={filter === 'Completed' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: 'All',
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};
