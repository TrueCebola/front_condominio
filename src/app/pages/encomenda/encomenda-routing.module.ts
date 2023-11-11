import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncomendaComponent } from './encomenda.component';

const routes: Routes = [{ path: '', component: EncomendaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncomendaRoutingModule { }
