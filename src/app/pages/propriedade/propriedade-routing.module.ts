import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropriedadeComponent } from './propriedade.component';

const routes: Routes = [{ path: '', component: PropriedadeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropriedadeRoutingModule { }
