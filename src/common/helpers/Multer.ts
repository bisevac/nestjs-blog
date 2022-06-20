import { HttpException, HttpStatus } from '@nestjs/common';

interface FilterOptions {
  mime: (
    | 'image/jpg'
    | 'image/png'
    | 'image/jpeg'
    | 'image/gif'
    | 'application/pdf'
    | 'image/svg+xml'
    | 'text/csv'
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'text/html'
    | 'audio/mpeg'
  )[];
}

export const fileFilter = (filterOptions: FilterOptions) => (req, file, cb) => {
  if (file?.mimetype && (filterOptions?.mime ?? []).includes(file?.mimetype)) {
    return cb(null, true);
  }

  cb(new HttpException('Unsupported mimetype', HttpStatus.BAD_REQUEST), null);
};
