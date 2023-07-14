import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from 'src/app.module';
import { setupSwagger } from 'src/utilities/swagger.utility';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true
  }));

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
