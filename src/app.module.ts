import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domain/auth/auth.module';
import { PdfModule } from './domain/pdf/pdf.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PdfModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
