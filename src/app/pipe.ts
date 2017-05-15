import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'group'})
export class GroupPipe implements PipeTransform {
  transform(value: any[], groupSize: string): any[] {
    let size = parseInt(groupSize),
      start = 0,
      groups = [];
    while (start < value.length) {
      groups.push(value.slice(start, start + size));
      start += size;
    }
    return groups;
  }
}
