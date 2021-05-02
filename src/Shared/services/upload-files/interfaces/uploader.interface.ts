import { Express } from 'express';

export type File = Express.Multer.File;

export interface UploadedFileInterface {
  upload: (files: File) => Promise<File>;
}
