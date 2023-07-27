import React from 'react';
import { ITodo } from '../../../../types/todo.types'; // Import the Todo interface
import { DesktopTodoListContainer } from './DesktopTodo.list.styled';
import TodoElement from '../../to-do.element/TodoElement';

const DesktopTodoList = ({
  todos,
  onDelete,
  onToggleIsCompleted
}: {
  todos: ITodo[];
  onDelete: (id: string) => void;
  onToggleIsCompleted: (id: string, isCompleted: boolean) => void;
}) => (
  <DesktopTodoListContainer>
    {todos.map((todo: ITodo) => (
      <TodoElement
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onToggleIsCompleted={() => onToggleIsCompleted(todo.id, todo.isCompleted || false)}
      />
    ))}
  </DesktopTodoListContainer>
);
export default DesktopTodoList;
