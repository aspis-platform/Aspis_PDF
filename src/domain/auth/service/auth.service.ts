import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get<string>('JWT_SECRETKEY') || 'default-secret-key'; // 기본값 설정 가능
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey);
      return true; // 유효한 토큰
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
