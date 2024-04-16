export class Review {
  nick: string;
  date: Date | null;
  content: string;
  id: number;

  constructor() {
    this.date = null;
    this.nick = '';
    this.content = '';
    this.id = 0;
  }
}
