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
      jwt.verify(token, this.secretKey); //jsonwebtoken 라이브러리의 verify() 메서드를 사용하여 토큰이 유효한지 확인
      return true; // 유효한 토큰
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
