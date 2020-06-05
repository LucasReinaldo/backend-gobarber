import fs from 'fs';
import path from 'path';
import mime from 'mime';
import uploadConfig from '@config/upload.config';
import aws, { S3 } from 'aws-sdk';

import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'eu-west-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originPath = path.resolve(uploadConfig.tmpFolder, file);

    const contentFileType = mime.getType(originPath);

    if (!contentFileType) {
      throw new Error('File not found.');
    }

    const fileContent = await fs.promises.readFile(originPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentFileType,
      })
      .promise();

    await fs.promises.unlink(originPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
