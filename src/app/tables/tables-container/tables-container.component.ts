import {Component, OnInit} from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'

@Component({
  selector: 'app-tables-container',
  templateUrl: './tables-container.component.html',
  styleUrls: ['./tables-container.component.less']
})
export class TablesContainerComponent implements OnInit {
  private EVENT_TYPES: any = {
    login_success: 'login_successful',
    login_failed: 'login_failed',
    table_list: 'table_list',
    table_added: 'table_added',
    table_removed: 'table_removed'
  };
  tables: any = [];
  ws = new $WebSocket("wss://js-assignment.evolutiongaming.com/ws_api");

  constructor() {
  }

  ngOnInit() {
    console.log('initialized connection', this.ws);

    let loginEvent = {
      "$type": "login",
      "username": "user1234",
      "password": "password1234"
    };

    this.ws.onMessage(
      (msg: MessageEvent)=> {
        // console.log("Incoming message: ", msg.data);
        let data = JSON.parse(msg.data);
        switch (data.$type) {
          case this.EVENT_TYPES.login_failed:
            console.error('Login failed');
            break;
          case this.EVENT_TYPES.login_success:
            this.getTables();
            break;
          case this.EVENT_TYPES.table_list:
            this.tables = data.tables;
            break;
          case this.EVENT_TYPES.table_added:
            this.addTable(data.table);
            break;
          case this.EVENT_TYPES.table_removed:
            this.removeTable(data.id);
            break;
        }

      },
      {autoApply: false}
    );

    this.ws.send(JSON.stringify(loginEvent)).subscribe();


  }

  getTables(): void {
    let tablesEvent = {
      "$type": "subscribe_tables"
    };
    this.ws.send(JSON.stringify(tablesEvent)).subscribe();
  }

  addTable(table: any): void {
    this.tables.push(table);
  }

  removeTable(id: number) {
    this.tables = this.tables.filter((el) => {
      return el.id !== id;
    });
  }

}
