import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setup(app: INestApplication) {
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'x-api-key',
    ],
  });
  const swaggerBasePath = configService.get('SWAGGER_BASE_PATH') || '/api';
  const config = new DocumentBuilder()
    .setTitle('Api test')
    .setDescription('Api description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(swaggerBasePath)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '/api-json',
  });

  return app;
}
