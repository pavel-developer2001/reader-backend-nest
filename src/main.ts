import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server start on port - ${PORT}`));
}
start();
