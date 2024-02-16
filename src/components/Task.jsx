import React, {useState} from 'react';
import '../index.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import { subscribe, unsubscribe } from 'utils/pulse';

export default function Task(props) {
  const { deleteTodo, todo, changeCheck, tickCallback, editTodo } = props;
  const { id, completed, date, task, minutes, seconds } = todo;
  const [value, setValue] = useState(task);
  const [isEditing, setIsEditing] = useState(false);
	
  const submit = (event) => {
    event.preventDefault();
    editTodo(id);
    setIsEditing(false);
  }

  return !isEditing ? (
    <li className={(completed && 'completed') || (isEditing && 'editing') || null}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          onChange={(e) => changeCheck(id, e.target.checked)}
          checked={completed}
        />
        <label htmlFor={id} className="label">
          <span className="title">{value}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => subscribe(id)} />
            <button className="icon icon-pause" onClick={() => unsubscribe(id)} />
            {'\t'}{minutes}:{seconds}
          </span>
          <span className="description">
            {` created ${formatDistanceToNow(date, {
              addSuffix: true,
              includeSeconds: true,
            })}`}
          </span>
        </label>
        <button
          type="button"
          aria-label="edit"
          className="icon icon-edit"
          onClick={() => {
            setIsEditing((prevIsEditing) => !prevIsEditing);
            setValue(value);
          }}
        />
        <button
          type="button"
          aria-label="destroy"
          className="icon icon-destroy"
          onClick={() => {
            unsubscribe(id);
            deleteTodo(id);
            }
          }/>
      </div>
    </li>
  ) : (
    <form onSubmit={submit}>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type="text"
        className="edit"
      />
    </form>
  );
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    isEditing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
