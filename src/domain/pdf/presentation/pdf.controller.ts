import { Response } from 'express';
import * as fs from 'fs';
import { Controller, Get, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PdfRequestDto } from '../dto/pdf.request.dto';
import { PdfService } from '../service/pdf.service';



@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('generate')
  @UsePipes(new ValidationPipe({ transform: true })) //transform: true 옵션을 주면, 요청 데이터를 PdfRequestDto 객체로 변환
  async generatePdf(@Query() query: PdfRequestDto, @Res() res: Response) {
    try {
      const { url } = query;
      const pdfPath = await this.pdfService.generatePdf(url);

      // 파일 다운로드
      res.download(pdfPath, 'download.pdf', (err) => {
        if (err) {
          console.error('파일 다운로드 오류:', err);
          res.status(500).json({ message: '파일 전송 중 오류 발생' });
        }

        // 다운로드 후 임시 파일 삭제
        fs.unlinkSync(pdfPath);
      });
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      return res.status(500).json({ message: 'PDF 생성 중 오류 발생' });
    }
  }
}

