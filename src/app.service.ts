import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createZip(
    files: Express.Multer.File[],
    destinationPath: string,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const output = fs.createWriteStream(destinationPath);
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Compression level (0-9)
      });

      output.on('close', () => {
        resolve(destinationPath);
      });

      archive.on('error', (err) => {
        reject(err);
      });

      archive.pipe(output);
      console.log('i am before log');

      files.forEach((file) => {
        console.log(file);

        // const filePath = path.join(file.path, file.originalname);
        // console.log(filePath);

        archive.append(file.buffer, { name: file.originalname });
      });

      archive.finalize();
    });
  }
  async
}
