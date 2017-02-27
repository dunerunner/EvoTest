import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TablesContainerComponent} from './tables-container/tables-container.component';

const routes: Routes = [
  {path: '', component: TablesContainerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule {
}
