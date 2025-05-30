import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWordsPipe',
})
export class CapitalizeWordsPipePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
