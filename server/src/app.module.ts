import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongooseSchemasModule } from './mongoose/mongoose.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { initializeAdminJs } from './adminjs';
import { AuthModule } from './auth/auth.module';

import('adminjs').then(({ AdminJS }) => {
  import('@adminjs/mongoose').then((AdminJSMongoose) => {
    AdminJS.registerAdapter({
      Resource: AdminJSMongoose.Resource,
      Database: AdminJSMongoose.Database,
    });
  });
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    initializeAdminJs,
    MongooseSchemasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
