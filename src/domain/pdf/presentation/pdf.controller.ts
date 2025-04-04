import { Response } from 'express';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Controller, Get, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PdfRequestDto } from '../dto/pdf.request.dto';
import { PdfService } from '../service/pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('generate')
  @UsePipes(new ValidationPipe({ transform: true })) 
  async generatePdf(@Query() query: PdfRequestDto, @Res() res: Response) {
    try {
      const { url } = query;
      const pdfPath = await this.pdfService.generatePdf(url);


      const filename = `${uuidv4()}.pdf`;

      res.download(pdfPath, filename, (err) => { //클라에게 전달
        if (err) {
          console.error('파일 다운로드 오류:', err);
          res.status(500).json({ message: '파일 전송 중 오류 발생' });
        }

        
        fs.unlinkSync(pdfPath); //전송 후 삭제
      });
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      return res.status(500).json({ message: 'PDF 생성 중 오류 발생' });
    }
  }
}
