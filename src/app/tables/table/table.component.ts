import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Table} from '../table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  @Input() table: Table;
  @Output() deleteTableEvent = new EventEmitter();
  @Output() selectTableEvent = new EventEmitter();

  private MAX_PARTICIPANTS: number = 12;
  participants: any = [];
  userRole: string = localStorage.getItem('user_role');

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < this.MAX_PARTICIPANTS; i++) {
      if (i < this.table.participants) {
        this.participants.push({available: false});
      } else {
        this.participants.push({available: true});
      }
    }
  }

  removeTable(): void {
    this.deleteTableEvent.emit(this.table);
  }

  selectTable(): void {
    this.selectTableEvent.emit(this.table);
  }

}
