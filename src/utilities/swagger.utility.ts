import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AdminModule } from "src/admin/admin.module";

export const setupSwagger = (app) => {
    const config = new DocumentBuilder()
    .setTitle('Football Admin API')
    .setDescription('Admin API description')
    .setVersion('1.0')
    .addApiKey({
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
    }, 'x-api-key')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AdminModule]
  });
  SwaggerModule.setup('admin/documentation', app, document);
}