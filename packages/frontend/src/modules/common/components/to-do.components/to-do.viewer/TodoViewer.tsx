import React from 'react';
import Switch from 'react-switch';
import { useParams, useHistory } from 'react-router-dom';
import { useTodoById, useUpdateTodo } from '../../../../hooks/to-do.hooks';
import { Button } from '../to-do.element/todoElement.styled';
import { APP_KEYS } from '../../../consts';
import { TodoViewerContainer, TodoViewerButtons, Description, Title } from './TodoViewer.styled';

const TodoViewer = () => {
  const { id } = useParams<{ id: string }>();
  const { data: todo, isLoading, isError } = useTodoById(id);
  const updateTodo = useUpdateTodo();
  const history = useHistory();

  const isCompletedMessage = todo?.isCompleted ? 'Виконано' : 'Не виконано';
  const isPublicMessage = todo?.isPublic ? 'Публічна' : 'Приватна';

  const handleToggleIsPublic = () => {
    const updatedTodo = { ...todo, isPublic: !todo.isPublic };
    updateTodo.mutateAsync({ id, todo: updatedTodo });
  };

  const handleEditTodo = () => {
    history.push(`${APP_KEYS.ROUTER_KEYS.TODOS}/edit/${id}`);
  };

  const handleback = () => {
    history.replace(APP_KEYS.ROUTER_KEYS.TODOS);
    history.push(APP_KEYS.ROUTER_KEYS.TODOS);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !todo) {
    return <p>Failed to fetch todo data.</p>;
  }

  return (
    <TodoViewerContainer>
      <Title>Titile: {todo.title}</Title>
      <h4>Description</h4>
      <Description>{todo.description}</Description>
      <p>{isPublicMessage}</p>
      <Switch onChange={handleToggleIsPublic} checked={todo?.isPublic as boolean} />
      <p>{isCompletedMessage}</p>
      <TodoViewerButtons>
        <Button onClick={handleEditTodo}>Edit</Button>
        <Button onClick={handleback}>Back</Button>
      </TodoViewerButtons>
    </TodoViewerContainer>
  );
};

export default TodoViewer;
