import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PdfController } from './presentation/pdf.controller';
import { PdfService } from './service/pdf.service';





@Module({
    imports: [
      ConfigModule.forRoot(), 
    ],
    providers: [PdfService],  //주로 서비스(@Injectable())나 리포지토리를 등록하는 배열입니다.
    controllers: [PdfController], 
    exports: [PdfService] //컨트롤러는 모듈 외부에서 직접 주입하여 사용하지 않으므로, exports할 필요가 없습니다.
  })
  export class PdfModule { }
  