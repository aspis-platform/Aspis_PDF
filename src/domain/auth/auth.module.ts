import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './service/auth.service';


@Module({
    imports: [
      ConfigModule.forRoot(), 
    ],
    providers: [AuthService],  //주로 서비스(@Injectable())나 리포지토리를 등록하는 배열입니다.
    controllers: [AuthController], 
    exports: [AuthService] //컨트롤러는 모듈 외부에서 직접 주입하여 사용하지 않으므로, exports할 필요가 없습니다.
  })
  export class AuthModule { }
  