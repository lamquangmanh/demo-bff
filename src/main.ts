import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port = config.get('port');
  const env = config.get('env');

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
