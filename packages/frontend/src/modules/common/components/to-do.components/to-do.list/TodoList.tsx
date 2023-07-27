import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useDeleteTodo, useUpdateTodo, useFilteredTodos } from '../../../../hooks/to-do.hooks';
import { IFilteredTodo, ITodo, ITodoUpdate } from '../../../types/todo.types';
import { Devices } from '../../../../theme/divices.const';
import DesktopTodoList from './desktop.list/DesktopTodo.list';
import MobileTodoList from './mobile.list/MobileTodo.list';
import TabletTodoList from './tablet.list/TableTodo.list';
import { APP_KEYS } from '../../../consts';
import Preloader from '../../../../utils/components/Preloader';
import { Button } from '../to-do.element/todoElement.styled';
import { ButtonContainer } from './Button.styled';

const TodoList = () => {
  const [filter, setFilter] = useState<IFilteredTodo>({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });
  const { data: todos, isLoading, isError } = useFilteredTodos(filter, pagination);
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const history = useHistory();
  const queryClient = useQueryClient();

  const handlePrevPage = () => {
    setPagination((prevPagination) => ({ ...prevPagination, page: prevPagination.page - 1 }));
  };

  const handleNextPage = () => {
    setPagination((prevPagination) => ({ ...prevPagination, page: prevPagination.page + 1 }));
  };
  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  const handleToggleIsCompleted = async (id: string, isCompleted: boolean) => {
    const todoToUpdate = todos.find((todo: ITodo) => todo.id === id);

    const updatedTodo: ITodoUpdate = {
      ...todoToUpdate,
      isCompleted: !isCompleted
    };
    await updateTodo.mutateAsync({ id, todo: updatedTodo });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: event.target.value });
  };

  const handleFilterClick = (status: string | null) => {
    if (status === null) {
      const { isCompleted, isPublic, ...rest } = filter;
      setFilter(rest);
    } else if (status === 'Completed') {
      setFilter({ ...filter, isCompleted: true, isPublic: undefined });
    } else if (status === 'Not Completed') {
      setFilter({ ...filter, isCompleted: false, isPublic: undefined });
    } else if (status === 'Private') {
      setFilter({ ...filter, isCompleted: undefined, isPublic: false });
    } else if (status === 'Public') {
      setFilter({ ...filter, isCompleted: undefined, isPublic: true });
    }
  };

  const handleClearFilters = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('search');
    newUrl.searchParams.delete('isCompleted');
    newUrl.searchParams.delete('isPublic');
    history.replace(newUrl.pathname);
    setFilter({});
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (filter.search) {
      params.set('search', filter.search);
    }
    if (filter.isCompleted !== undefined) {
      params.set('status', filter.isCompleted ? 'Completed' : 'Not Completed');
    }
    if (filter.isPublic !== undefined) {
      params.set('status', filter.isPublic ? 'Public' : 'Private');
    }
    history.replace(`${APP_KEYS.ROUTER_KEYS.TODOS}?${params.toString()}`);
    queryClient.refetchQueries([APP_KEYS.QUERY_KEYS.TODOS, filter, pagination]);
  }, [filter, history, queryClient]);

  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    return <p>Failed to get data</p>;
  }

  const isDesktop = window.innerWidth >= Devices.DESKTOP;
  const isTablet = window.innerWidth >= Devices.MOBILE && window.innerWidth <= Devices.DESKTOP;

  return (
    <>
      <ButtonContainer>
        <Button onClick={handlePrevPage} disabled={pagination.page === 1}>
          Prev
        </Button>
        <Button onClick={handleClearFilters}>Clear Filters</Button>
        <Button onClick={() => handleFilterClick('Public')}>Public</Button>
        <Button onClick={() => handleFilterClick('Private')}>Private</Button>
        <Button onClick={() => handleFilterClick('Completed')}>Completed</Button>
        <Button onClick={() => handleFilterClick('Not Completed')}>Not Completed</Button>
        <Button onClick={handleNextPage} disabled={!todos?.length}>
          Next
        </Button>
      </ButtonContainer>
      <input
        type="text"
        value={filter.search || ''}
        onChange={handleSearchChange}
        placeholder="Search by title"
      />
      {isDesktop && (
        <DesktopTodoList
          todos={todos}
          onDelete={handleDelete}
          onToggleIsCompleted={handleToggleIsCompleted}
        />
      )}
      {isTablet && (
        <TabletTodoList
          todos={todos}
          onDelete={handleDelete}
          onToggleIsCompleted={handleToggleIsCompleted}
        />
      )}
      {!isDesktop && !isTablet && (
        <MobileTodoList
          todos={todos}
          onDelete={handleDelete}
          onToggleIsCompleted={handleToggleIsCompleted}
        />
      )}
    </>
  );
};

export default TodoList;
