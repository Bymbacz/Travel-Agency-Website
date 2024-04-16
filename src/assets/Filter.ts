export class Filter {
  country: string;
  max: number;
  min: number;
  startdate: string;
  enddate: string;

  constructor() {
    this.country = '';
    this.max = -1;
    this.min = -1;
    this.startdate = '';
    this.enddate = '';
  }
}
