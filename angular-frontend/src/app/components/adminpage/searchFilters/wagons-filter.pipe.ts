import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wagonsFilter'
})
export class WagonsFilterPipe implements PipeTransform {

  transform(wagons: any[], searchTerm: string): any {
    if (!wagons) {
      return [];
    }

    if (!searchTerm) {
      return wagons;
    }

    return wagons.filter(wagon => {
      return JSON.stringify(wagon).toLowerCase().includes(searchTerm);
    });
  }

}
