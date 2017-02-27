import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablesContainerComponent} from './tables-container/tables-container.component';
import {TablesRoutingModule} from './tables-routing.module';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule
  ],
  declarations: [TablesContainerComponent, TableComponent]
})
export class TablesModule {
}
