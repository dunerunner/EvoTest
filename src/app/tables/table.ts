export class Table {
  id: number;
  name: string;
  participants: number;
  hidden: boolean = false;

  constructor(name: string, participants: number) {
    this.name = name;
    this.participants = participants;
    this.hidden = false;
    this.id = 0;
  }
}
