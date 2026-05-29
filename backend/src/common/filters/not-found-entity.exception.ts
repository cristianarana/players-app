import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundEntityException extends HttpException {
  constructor(entityName: string) {
    super(
      { message: `${entityName} no encontrado`, entityName },
      HttpStatus.NOT_FOUND,
    );
  }
}
