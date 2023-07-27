import { Router } from 'express';

import { validateTodo } from '../../utils/generic-validator';
import todoController from '../../controllers/todo.controller';
import { isTodoExist } from '../../middlewares/isExist.middleware';
import { tryCatch } from '../../utils/tryCatch';
import { authenticate } from '../../middlewares/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get('/', authenticate, tryCatch(todoController.getByFilters.bind(todoController)));
todosRouter.get(
  '/:id',
  authenticate,
  isTodoExist,
  tryCatch(todoController.getByIdTodo.bind(todoController))
);
todosRouter.post(
  '/create',
  authenticate,
  validateTodo,
  tryCatch(todoController.createTodo.bind(todoController))
);
todosRouter.put(
  '/update/:id',
  authenticate,
  isTodoExist,
  tryCatch(todoController.updateTodo.bind(todoController))
);
todosRouter.delete(
  '/delete/:id',
  authenticate,
  isTodoExist,
  tryCatch(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
