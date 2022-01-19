import {Pipe, PipeTransform} from '@angular/core';
import {Request} from '../../../models/request/request';

@Pipe({
  name: 'meldingFilter'
})
export class MeldingFilterPipe implements PipeTransform {

  transform(meldingen: any[], searchTerm: string): any {
    if (!meldingen) {
      return [];
    }

    if (!searchTerm) {
      return meldingen;
    }
    return meldingen.filter((melding: Request) => {
      return JSON.stringify(melding).toLowerCase().includes(searchTerm);
    });
  }

}
