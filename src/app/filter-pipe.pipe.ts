import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trips-list';
import { Filter } from '../assets/Filter';

@Pipe({
  name: 'filterPipe',
  pure: false,
})
export class FilterPipePipe implements PipeTransform {
  transform(trips: any[], filter: Filter): any[] {
    if (filter.country != '') {
      trips = trips.filter((trip) => {
        return trip.data.country
          .toLowerCase()
          .includes(filter.country.toLowerCase());
      });
    }
    if (filter.startdate != '') {
      trips = trips.filter((trip) => {
        return new Date(trip.data.start) >= new Date(filter.startdate);
      });
    }
    if (filter.enddate != '') {
      trips = trips.filter((trip) => {
        return new Date(trip.data.end) <= new Date(filter.enddate);
      });
    }
    if (filter.min != -1) {
      trips = trips.filter((trip) => {
        return trip.data.value >= filter.min;
      });
    }
    if (filter.max != -1) {
      trips = trips.filter((trip) => {
        return trip.data.value <= filter.max;
      });
    }

    return trips;
  }
}
