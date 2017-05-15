import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'group'})
export class GroupPipe implements PipeTransform {
  transform(value: any[], groupSize: string): any[] {
    let size = parseInt(groupSize),
      groups = [];
    while (value.length > 0)
      groups.push(value.splice(0, size));
    return groups;
  }
}
