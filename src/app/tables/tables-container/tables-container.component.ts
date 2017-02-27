import {Component, OnInit} from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Table} from '../table';

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
    table_removed: 'table_removed',
    table_updated: 'table_updated',
    removal_failed: 'removal_failed'
  };
  tables: Array<Table> = [];
  userRole: string;
  selectedTable: Table = new Table('', null);

  ws = new $WebSocket("wss://js-assignment.evolutiongaming.com/ws_api");

  constructor() {
  }

  ngOnInit() {
    let loginEvent = {
      "$type": "login",
      "username": "user1234",
      "password": "password1234"
    };

    this.ws.onMessage(
      (msg: MessageEvent)=> {
        let data = JSON.parse(msg.data);
        switch (data.$type) {
          case this.EVENT_TYPES.login_failed:
            console.error('Login failed');
            break;
          case this.EVENT_TYPES.login_success:
            this.userRole = data.user_type;
            localStorage.setItem('user_role', data.user_type);
            this.getTables();
            break;
          case this.EVENT_TYPES.table_list:
            this.tables = data.tables;
            break;
          case this.EVENT_TYPES.table_added:
            this.addTable(data.table, data.after_id);
            break;
          case this.EVENT_TYPES.table_removed:
            this.removeTable(data.id);
            break;
          case this.EVENT_TYPES.table_updated:
            this.updateTable(data.table);
            break;
          case this.EVENT_TYPES.removal_failed:
            console.error('Table removal failed');
            this.showTable(data.id);
            break;
        }
      },
      {autoApply: false}
    );
    this.sendEvent(loginEvent);
  }

  getTables(): void {
    let tablesEvent = {
      "$type": "subscribe_tables"
    };
    this.sendEvent(tablesEvent);
  }

  addTable(table: Table, after_id: number): void {
    if (!after_id) {
      this.tables.push(table);
      return;
    }
    if (after_id === -1) {
      this.tables.unshift(table);
    }
    //noinspection TypeScriptUnresolvedFunction
    let index = this.tables.findIndex((el) => {
      return el.id === after_id;
    });
    this.tables.splice(index + 1, 0, table);
  }

  removeTable(id: number): void {
    this.tables = this.tables.filter((el) => {
      return el.id !== id;
    });
  }

  updateTable(table: Table): void {
    //noinspection TypeScriptUnresolvedFunction
    let index = this.tables.findIndex((el) => {
      return el.id === table.id;
    });

    this.tables[index] = table;
  }

  showTable(id: number): void {
    //noinspection TypeScriptUnresolvedFunction
    let tableToUpdate = this.tables.find((el) => {
      return el.id === id;
    });
    tableToUpdate.hidden = false;
  }

  handleSaveTable(table: Table): void {
    table.id = 1;
    let tableSaveEvent = {
      "$type": "add_table",
      "after_id": this.tables[this.tables.length - 1].id,
      "table": table
    };
    this.sendEvent(tableSaveEvent);
  }

  handleEditTable(table: Table): void {
    let updateTableEvent = {
      "$type": "update_table",
      "table": table
    };
    this.sendEvent(updateTableEvent);
  }

  handleDeleteTable(table: Table): void {
    let tableDeleteEvent = {
      "$type": "remove_table",
      "id": table.id
    };
    table.hidden = true;
    this.sendEvent(tableDeleteEvent);
  }

  handleSelectTable(table: Table): void {
    this.selectedTable = table;
  }

  handleCancelEdit(): void {
    this.selectedTable = new Table('', null);
  }

  sendEvent(event: any): void {
    this.ws.send(JSON.stringify(event)).subscribe();
  }
}
