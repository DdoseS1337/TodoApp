import { IUser } from './user.types';

export interface ITodo {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  isCompleted?: boolean;
  user: IUser;
}

export interface ITodoCreate {
  title: string;
  description: string;
  isPublic: boolean;
  isCompleted?: boolean;
}

export interface ITodoUpdate {
  title: string;
  description: string;
  isPublic: boolean;
  isCompleted?: boolean;
}

export interface IFilteredTodo {
  search?: string;
  isPublic?: boolean;
  isCompleted?: boolean;
}
export interface ITodoPagination {
  page?: number;
  pageSize?: number;
}
