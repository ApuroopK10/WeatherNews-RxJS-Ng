import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'naArtileList',
})
export class NaArtileListPipe implements PipeTransform {
  transform(value: string, name: string): string {
    return value.replace(name, '');
  }
}
