import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {LoggerMiddleware} from "./common/logger.middleware";
import {AuthGuard} from "./guards/auth.guard";
import {ResponseInterceptor} from "./interceptors/response.interceptor";
import {AllExceptionsFilter} from "./common/filters/all-exceptions.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {MovieDto} from "./movie/dto/movie.dto";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.use(LoggerMiddleware)

  app.useGlobalInterceptors(new ResponseInterceptor())

  app.useGlobalFilters(new AllExceptionsFilter())

  // app.useGlobalGuards(AuthGuard)

  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('The Movie API description')
    .setVersion('1.0')
    .setContact('API Support', 'http://www.example.com/support', 'support@gmail.com')
    .addBearerAuth()
    .addApiKey()
    .setLicense('MIT', 'http://examples.http-client.intellij.net')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
    deepScanRoutes: true,
    // extraModels: [MovieDto],
    // operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('/', app, document, {
    jsonDocumentUrl: '/swagger-json',
    yamlDocumentUrl: '/swagger-yaml',
    customSiteTitle: 'Movie API',
    // customSwaggerUiPath: '/swagger',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
