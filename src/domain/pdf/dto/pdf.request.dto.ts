import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class PdfReqeustDto {
  @IsString()
  @IsNotEmpty({ message: 'URL을 입력해야 합니다.' })
  @IsUrl({}, { message: '올바른 URL 형식이 아닙니다.' })
  url: string;
}
