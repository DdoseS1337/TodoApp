import { FindManyOptions, Like } from 'typeorm';
import { IUser } from '../types/user.type';
import { Todo } from '../entities/Todo';
import { ITodoCreate, ITodoUpdate } from '../types/todos.type';

export default class TodoService {
  async findAll(user: IUser): Promise<Todo[]> {
    return Todo.find({ where: { user } });
  }

  async findById(id: string, user: IUser): Promise<Todo | null> {
    return Todo.findOne({ where: { id, user } });
  }

  async create(todoData: ITodoCreate, user: IUser): Promise<Todo> {
    const todo = Todo.create({ ...todoData, user });
    return todo.save();
  }

  async update(id: string, todoData: ITodoUpdate, user: IUser): Promise<Todo | null> {
    const todoToUpdate = await Todo.findOne({ where: { id, user } });
    if (!todoToUpdate) {
      return null;
    }

    Object.assign(todoToUpdate, todoData);
    await todoToUpdate.save();

    return todoToUpdate;
  }

  async delete(id: string, user: IUser): Promise<Todo | null> {
    const deletedTodo = await Todo.findOne({ where: { id, user } });
    if (deletedTodo) {
      await Todo.delete(id);
      return deletedTodo;
    }
    return null;
  }

  async findByFilters(
    user: IUser,
    search: string,
    isCompleted: string,
    isPublic: string,
    page: number,
    pageSize: number
  ): Promise<Todo[]> {
    const filters: FindManyOptions<Todo> = {
      where: {
        user
      }
    };

    if (search !== '') {
      filters.where = {
        ...filters.where,
        title: Like(`%${search}%`)
      };
    }

    if (typeof isCompleted === 'string' && isCompleted === 'true') {
      filters.where = {
        ...filters.where,
        isCompleted: true
      };
    } else if (typeof isCompleted === 'string' && isCompleted === 'false') {
      filters.where = {
        ...filters.where,
        isCompleted: false
      };
    }

    // Фільтрація за полем isPublic
    if (typeof isPublic === 'string' && isPublic === 'true') {
      filters.where = {
        ...filters.where,
        isPublic: true
      };
    } else if (typeof isPublic === 'string' && isPublic === 'false') {
      filters.where = {
        ...filters.where,
        isPublic: false
      };
    }

    const skip = (page - 1) * pageSize;
    filters.skip = skip;
    filters.take = pageSize;

    return Todo.find(filters);
  }
}
