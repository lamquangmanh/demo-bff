import 'dotenv/config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { RedisStore } from 'connect-redis';

import { AppModule } from './app.module';
import { LoggerInterceptor } from './common/interceptors';
import { configs, bffRedisClient } from './common/configs';
import { RedisIoAdapter } from './infrastructure/websocket';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // Create Redis store for sessions
  const redisStore = new RedisStore({
    client: bffRedisClient,
    prefix: 'session:',
  });

  app.use(
    session({
      secret: configs.JWT_SECRET,
      resave: false, // Meaning: Don’t automatically save the session back to the store if it hasn’t changed.
      saveUninitialized: false, // Meaning: Don’t create a session until something is stored.
      cookie: {
        httpOnly: true, // Prevents JavaScript access via document.cookie. Protects against XSS.
        secure: configs.NODE_ENV === 'production', // Allows cookie over HTTP (not HTTPS). For local dev only. In production → set secure: true.
        sameSite: configs.NODE_ENV === 'production' ? 'none' : 'lax', // CSRF protection
      },
      store: redisStore, // Use Redis to store session data, scaling better than in-memory store
    }),
  );

  // Set up WebSocket with Redis adapter
  const redisIoAdapter = new RedisIoAdapter(app);
  redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  app.enableCors({
    // Allow CORS for local
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen(process.env.PORT ?? 4000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
