import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {LoggerMiddleware} from "./common/logger.middleware";
import {AuthGuard} from "./guards/auth.guard";
import {ResponseInterceptor} from "./interceptors/response.interceptor";
import {AllExceptionsFilter} from "./common/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(LoggerMiddleware)

  app.useGlobalInterceptors(new ResponseInterceptor())

  app.useGlobalFilters(new AllExceptionsFilter())

  // app.useGlobalGuards(AuthGuard)

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
