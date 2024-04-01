import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const config = app.get(ConfigService);

  const port = config.get('port');
  const env = config.get('env');

  app.use(morgan('tiny'));

  // @TODO: set origin FE
  app.enableCors();

  await app.listen(port, async () => {
    console.info(`\n\n==========================================`);
    console.info(`        ENV: ${env}    `);
    console.info(
      `🚀🚀 Graphql playground running on the url: http://localhost:${port}/graphql 🚀🚀`,
    );
    console.info(`==========================================`);
  });
}
bootstrap();
