import {Injectable, NestMiddleware} from "@nestjs/common";
import type {NextFunction, Response, Request} from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request... ${req.method} ${req.url}`)

    next()
  }
}
