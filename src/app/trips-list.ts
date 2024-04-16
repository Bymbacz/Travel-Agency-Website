import { Review } from './review';

export class Trip {
  id: number;
  title: string;
  country: string;
  start: string;
  end: string;
  value: number;
  max_capacity: number;
  capacity: number;
  yoursRes: number;
  details: string;
  link: string;
  image1: string;
  image2: string;
  reviews: Review[];
}
