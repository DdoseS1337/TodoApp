import React from 'react';
import { ITodo } from '../../../../types/todo.types'; // Import the Todo interface
import TodoElement from '../../to-do.element/TodoElement';
import { MobileTodoListContainer } from './MobileTodo.list.styled';

const MobileTodoList = ({
  todos,
  onDelete,
  onToggleIsCompleted
}: {
  todos: ITodo[];
  onDelete: (id: string) => void;
  onToggleIsCompleted: (id: string, isCompleted: boolean) => void;
}) => (
  <MobileTodoListContainer>
    {todos.map((todo: ITodo) => (
      <TodoElement
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onToggleIsCompleted={() => onToggleIsCompleted(todo.id, todo.isCompleted || false)}
      />
    ))}
  </MobileTodoListContainer>
);
export default MobileTodoList;
