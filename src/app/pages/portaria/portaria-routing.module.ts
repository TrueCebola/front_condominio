import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortariaComponent } from './portaria.component';

const routes: Routes = [{ path: '', component: PortariaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortariaRoutingModule { }
