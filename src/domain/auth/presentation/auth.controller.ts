import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify')
  verifyToken(@Headers('authorization') authHeader: string) { //요청(request)의 헤더(Header) 중 "authorization" 값을 가져옴
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return { valid: false, message: 'No token provided or invalid format' }; //토큰이 존재하는지 확인
    }

    //요청예시
    // GET /verify HTTP/1.1
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
    

    const token = authHeader.split(' ')[1]; //"Bearer eyJhbGciOiJIUzI1NiIsInR" 
    try {
      const isValid = this.authService.verifyToken(token);
      return { valid: isValid, message: 'Token is valid' };
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }
}
