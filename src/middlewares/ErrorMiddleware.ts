import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor';
  res.status(status).json({ message });
};
