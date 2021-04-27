import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos
  }))
  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)))
  const onInsert = useCallback(text => dispatch(insert(text)), [dispatch])
  const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch])
  const onRemove = useCallback(id => dispatch(remove(id)), [dispatch])

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
    />
  )
}

export default React.memo(TodosContainer);