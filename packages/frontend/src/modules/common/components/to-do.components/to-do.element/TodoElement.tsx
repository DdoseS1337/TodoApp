import React from 'react';
import Switch from 'react-switch';
import { useHistory } from 'react-router-dom';
import { ITodo } from '../../../types/todo.types';
import { APP_KEYS } from '../../../consts';
import {
  Button,
  Description,
  SwitchContainer,
  Title,
  TodoActionsContainer,
  TodoElementContainer
} from './todoElement.styled';

interface TodoElementProps {
  todo: ITodo;
  onDelete: (id: string) => void;
  onToggleIsCompleted: (id: string, isCompleted: boolean) => void;
}

const TodoElement: React.FC<TodoElementProps> = ({ todo, onDelete, onToggleIsCompleted }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleToggleIsCompleted = () => {
    onToggleIsCompleted(todo.id, todo.isCompleted || false);
  };

  const history = useHistory();

  const handleViewDetails = () => {
    history.push(`${APP_KEYS.ROUTER_KEYS.TODOS}/${todo.id}`);
  };

  return (
    <TodoElementContainer>
      <Title>{todo?.title}</Title>
      <Description>{todo?.description}</Description>
      <TodoActionsContainer>
        <Button type="button" onClick={handleViewDetails}>
          View Details
        </Button>
        <Button type="button" onClick={handleDelete}>
          Delete
        </Button>
        <SwitchContainer>
          <p>Complete</p>
          <Switch onChange={handleToggleIsCompleted} checked={todo?.isCompleted as boolean} />
        </SwitchContainer>
      </TodoActionsContainer>
    </TodoElementContainer>
  );
};

export default TodoElement;
