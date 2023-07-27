import { useMutation, useQuery, useQueryClient } from 'react-query';
import React from 'react';
import { TodoService } from '../service/to-do.service';
import {
  IFilteredTodo,
  ITodoCreate,
  ITodoPagination,
  ITodoUpdate
} from '../common/types/todo.types';
import { APP_KEYS } from '../common/consts';

const todoService = new TodoService();

export function useTodos() {
  return useQuery(APP_KEYS.QUERY_KEYS.TODOS, () => todoService.getAllTodos());
}

export function useTodoById(id: string) {
  return useQuery([APP_KEYS.QUERY_KEYS.TODOS, id], () => todoService.getTodoById(id));
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation((todo: ITodoCreate) => todoService.createTodo(todo), {
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    }
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, todo }: { id: string; todo: ITodoUpdate }) => todoService.updateTodoById(id, todo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
      }
    }
  );
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation((id: string) => todoService.deleteTodoById(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    }
  });
}

export function useFilteredTodos(
  { search, isCompleted, isPublic }: IFilteredTodo = {},
  { page = 1, pageSize = 5 }: ITodoPagination = {}
) {
  const query = useQuery(
    [APP_KEYS.QUERY_KEYS.TODOS, search, isCompleted, isPublic, page, pageSize],
    () => todoService.findByFilters(search, isCompleted, isPublic, page, pageSize)
  );

  React.useEffect(() => {
    query.refetch();
  }, [search, isCompleted, isPublic]);

  return query;
}
