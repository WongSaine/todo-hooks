import React, { useState, useLayoutEffect } from 'react';

import './index.css';
import NewTaskForm from 'components/NewTaskForm';
import Footer from 'components/Footer';
import TaskList from 'components/TaskList';
import { subscribers, unsubscribe } from 'utils/pulse';

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  useLayoutEffect(() => {
    setInterval(tickCallback, 1000);
  }, []);

  const addTodo = (value, minutes, seconds) => {
    const newTodo = {
      id: window.crypto.randomUUID(),
      task: value,
      minutes,
      seconds,
      completed: false,
      date: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

  const changeCheck = (id, event) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
        const result = { ...todo };
        if (id === todo.id) result.completed = event;
        return result;
      })
    );
  };

  const editTodo = (id) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const filteredItems = () => {
    switch (filter) {
      case 'Active':
        return todos.filter((todo) => !todo.completed);
      case 'Completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const changeFilter = (data) => {
    setFilter(data);
  };

  const clearCompleted = () => {
    todos.map((todo) => todo.completed ? unsubscribe(todo.id) : undefined);
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const tickCallback = () => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (subscribers.has(todo.id)) {
        if (todo.seconds <= 0) {
          return {
            ...todo,
            minutes: todo.minutes - 1,
            seconds: 59,
          };
        }
        return { ...todo, seconds: todo.seconds - 1};
      }
      return todo;
    }));
  }
  return (
    <>
      <NewTaskForm addTodo={addTodo} />
      <section className="main">
        <TaskList
          todos={filteredItems()}
          changeCheck={changeCheck}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          tickCallback={tickCallback}
        />
        <Footer
          clearCompleted={clearCompleted}
          changeFilter={changeFilter}
          filter={filter}
          lefts={todos.filter(({ completed }) => !completed).length}
        />
      </section>
    </>
  );
}

export default App;
