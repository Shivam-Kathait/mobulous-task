import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ErrorHandler } from './error-handler/handler.services';

const { PORT } = process.env;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new ErrorHandler());
  const config = new DocumentBuilder()
    .setTitle('mobulous-task')
    .setDescription('Task API description')
    .setVersion('1.0')
    .addTag('integrai')
    .addBearerAuth({ type: 'http', name: 'authorization', in: 'header' }, 'authorization')
    .addServer('http://localhost:3009', 'local server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT);
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
}
bootstrap();
