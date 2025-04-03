import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify')
  verifyToken(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return { valid: false, message: 'No token provided or invalid format' };
    }

    const token = authHeader.split(' ')[1];
    try {
      const isValid = this.authService.verifyToken(token);
      return { valid: isValid, message: 'Token is valid' };
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }
}
