import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './service/auth.service';



@Module({
    imports: [
      ConfigModule.forRoot(), 
    ],
    providers: [AuthService,AuthController],
    controllers: [AuthController],
    exports: [AuthService]
  })
  export class AuthModule { }