import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  maxParticipants: number = 12;
  participants: any = [];
  @Input() table: any;

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < this.maxParticipants; i++) {
      if (i < this.table.participants) {
        this.participants.push({available: false});
      } else {
        this.participants.push({available: true});
      }
    }
  }

}
