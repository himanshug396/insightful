import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export function UseFileInterceptor(fieldName: string) {
  return applyDecorators(UseInterceptors(FileInterceptor(fieldName)));
}
