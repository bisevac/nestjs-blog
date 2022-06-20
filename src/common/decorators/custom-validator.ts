import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { AObject } from '../helpers/AObject';

interface IsFileOptions {
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

export function IsFile(
  options: IsFileOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: AObject, propertyName: string) {
    console.log(object, propertyName);
    return registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (
            value?.mimetype &&
            (options?.mime ?? []).includes(value?.mimetype)
          ) {
            return true;
          }
          return false;
        },
      },
    });
  };
}
