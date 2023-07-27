import { Request, Response, NextFunction } from 'express';
import { BaseEntity, FindOptionsWhere } from 'typeorm';

import { Todo } from '../entities/Todo';
import { tryCatch } from '../utils/tryCatch';
import { User } from '../entities/User';

function isExist<T extends BaseEntity>(Entity: typeof BaseEntity) {
  return tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }

    const item = await Entity.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
    if (!item) {
      return res.status(404).json({ error: `${Entity.name} not found` });
    }
    next();
  });
}

export const isTodoExist = isExist(Todo);
export const isUserExist = isExist(User);
