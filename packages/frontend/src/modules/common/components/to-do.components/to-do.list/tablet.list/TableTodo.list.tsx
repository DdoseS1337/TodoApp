import React from 'react';
import Slider from 'react-slick';
import { ITodo } from '../../../../types/todo.types'; // Import the Todo interface
import TodoElement from '../../to-do.element/TodoElement';
import { TabletTodoListContainer } from './TableTodo.list.styled';

const TabletTodoList = ({
  todos,
  onDelete,
  onToggleIsCompleted
}: {
  todos: ITodo[];
  onDelete: (id: string) => void;
  onToggleIsCompleted: (id: string, isCompleted: boolean) => void;
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <TabletTodoListContainer>
      <Slider {...settings}>
        {todos.map((todo: ITodo) => (
          <TodoElement
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggleIsCompleted={() => onToggleIsCompleted(todo.id, todo.isCompleted || false)}
          />
        ))}
      </Slider>
    </TabletTodoListContainer>
  );
};
export default TabletTodoList;
