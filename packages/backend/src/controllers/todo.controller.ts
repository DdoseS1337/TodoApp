import { Response, Request } from 'express';
import { RequestType } from '../types/request.type';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    // Отримати всі Todo
    const { user } = req as RequestType;
    const todos = await this.todoService.findAll(user);
    res.json(todos);
  }

  async getByIdTodo(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = req as RequestType;

    // Отримати Todo за ідентифікатором
    const todo = await this.todoService.findById(id, user);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  }

  async createTodo(req: Request, res: Response) {
    const data = req.body;
    const { user } = req as RequestType;
    // Створити новий Todo
    const newTodo = await this.todoService.create(data, user);
    res.status(201).json(newTodo);
  }

  async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const { user } = req as RequestType;
    // Оновити Todo за ідентифікатором
    const updatedTodo = await this.todoService.update(id, data, user);
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = req as RequestType;
    // Видалити Todo за ідентифікатором
    const deletedTodo = await this.todoService.delete(id, user);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(deletedTodo);
  }

  getByFilters = async (req: Request, res: Response) => {
    try {
      const { user } = req as RequestType;
      const { search, isCompleted, isPublic, page, pageSize } = req.query;

      const pageValue = Number(page) || 1;
      const pageSizeValue = Number(pageSize) || 5;

      const todos = await this.todoService.findByFilters(
        user,
        search?.toString() ?? '',
        isCompleted?.toString() ?? '',
        isPublic?.toString() ?? '',
        pageValue,
        pageSizeValue
      );

      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong. Please try again later' });
    }
  };
}

const todoController = new TodoController(new TodoService());
export default todoController;
