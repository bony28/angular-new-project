import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowerCaseWordsPipe',
})
export class LowerCaseWordsPipePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .split('')
      .map((x) => x.toLowerCase())
      .join('');
  }
}
