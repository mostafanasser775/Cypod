import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply ValidationPipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000', // Ensure this matches your frontend's origin
    credentials: true, // Allow cookies to be sent with requests
  });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
