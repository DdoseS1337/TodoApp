import HttpService from './http.service';
import { ITodoCreate, ITodoUpdate } from '../common/types/todo.types';
import { APP_KEYS } from '../common/consts';
import { ParamsType } from '../common/types/user.types';

export class TodoService extends HttpService {
  getAllTodos() {
    return this.get({
      url: APP_KEYS.BACKEND_KEYS.TODOS
    });
  }

  getTodoById(id: string) {
    return this.get({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`
    });
  }

  createTodo(todo: ITodoCreate) {
    return this.post({
      url: `${APP_KEYS.BACKEND_KEYS.TODOCREATE}`,
      data: todo
    });
  }

  updateTodoById(id: string, todo: ITodoUpdate) {
    return this.put({
      url: `${APP_KEYS.BACKEND_KEYS.TODOUPDATE}/${id}`,
      data: todo
    });
  }

  deleteTodoById(id: string) {
    return this.delete({
      url: `${APP_KEYS.BACKEND_KEYS.TODODELETE}/${id}`,
      data: undefined
    });
  }

  findByFilters(
    search: string | undefined,
    isCompleted: boolean | undefined,
    isPublic: boolean | undefined,
    page: number,
    pageSize: number
  ) {
    const params: ParamsType = {};

    if (search) {
      params.search = search;
    }
    if (isCompleted !== undefined) {
      params.isCompleted = isCompleted;
    }
    if (isPublic !== undefined) {
      params.isPublic = isPublic;
    }

    params.page = page;
    params.pageSize = pageSize;

    if (Object.keys(params).length === 0) {
      return this.get({
        url: APP_KEYS.BACKEND_KEYS.TODOS,
        params
      });
    }

    return this.get({
      url: APP_KEYS.BACKEND_KEYS.TODOS,
      params
    });
  }
}
