import { Request, Response, NextFunction } from 'express';

export const tryCatch =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      res.status(500).json({ error: `You have this error :${error}` });
    }
  };
