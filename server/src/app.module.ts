import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/mongoose';

import { MongooseSchemasModule } from './mongoose/mongoose.module.js';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
import { initializeAdminJs } from './adminjs/index.js';
import { AuthProvider } from './adminjs/authenticate.js';

AdminJS.registerAdapter({
  Resource: Resource,
  Database: Database,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    initializeAdminJs(),
    MongooseSchemasModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthProvider],
})
export class AppModule {}
