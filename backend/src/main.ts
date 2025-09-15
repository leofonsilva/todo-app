import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const mongoUri = configService.get<string>('MONGO_URI');

  if (!mongoUri) {
    throw new Error('MONGO_URI não está definido no .env');
  }
  
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  app.use('/favicon.ico', (req, res) => {
    res.status(204).end();
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
