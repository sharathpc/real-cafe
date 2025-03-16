import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseSchemasModule } from 'src/mongoose/mongoose.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [MongooseSchemasModule],
})
export class AuthModule {}
