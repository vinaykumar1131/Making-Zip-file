import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as archiver from 'archiver';
import * as fs from 'fs';
import * as path from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('zip')
  @UseInterceptors(FilesInterceptor('files'))
  async createZip(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);

    const destinationPath = 'file.zip';
    await this.appService.createZip(files, destinationPath);
    return { message: 'Zip file created successfully' };
  }
  @Get('download')
  async downloadZip(@Res() res: Response) {
    const files = [
      // Array of file objects
      // Each file object should have properties like fieldname, originalname, encoding, mimetype, buffer, size, etc.
    ];

    const zipFilePath = 'file.zip';

    try {


      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=file.zip');

      const fileStream = fs.createReadStream(zipFilePath);
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).send('Error creating zip file');
    }
  }
}
