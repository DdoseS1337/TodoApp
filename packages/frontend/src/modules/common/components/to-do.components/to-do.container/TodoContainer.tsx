import React from 'react';
import TodoList from '../to-do.list/TodoList';
import {
  AddTodoButton,
  ButtonsContainer,
  TodoContainerWrapper,
  TodoHeader
} from './TodoContainer.styled';
import { APP_KEYS } from '../../../consts';

const TodoContainer = () => (
  <TodoContainerWrapper>
    <TodoHeader>
      <h1>Todo List</h1>
      <ButtonsContainer>
        <div>
          <AddTodoButton to={APP_KEYS.ROUTER_KEYS.TODOADD}>Add Todo</AddTodoButton>
        </div>
        <div>
          <AddTodoButton to={APP_KEYS.ROUTER_KEYS.USER_PROFILE}>Your Profile</AddTodoButton>
        </div>
      </ButtonsContainer>
    </TodoHeader>
    <TodoList />
  </TodoContainerWrapper>
);

export default TodoContainer;
