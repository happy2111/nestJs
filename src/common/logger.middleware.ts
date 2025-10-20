import type {NextFunction, Request, Response} from "express";

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`Global Request Logger into Main... ${req.method} ${req.url}`)
  next()
}



