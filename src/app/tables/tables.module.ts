import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablesContainerComponent} from './tables-container/tables-container.component';
import {TablesRoutingModule} from './tables-routing.module';
import {TableComponent} from './table/table.component';
import {TableFormComponent} from './table-form/table-form.component';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule
  ],
  declarations: [TablesContainerComponent, TableComponent, TableFormComponent]
})
export class TablesModule {
}
