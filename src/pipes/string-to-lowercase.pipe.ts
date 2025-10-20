import {ArgumentMetadata, Injectable, type PipeTransform} from '@nestjs/common';

@Injectable()
export class StringToLowerCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }

    return value;
  }
}
