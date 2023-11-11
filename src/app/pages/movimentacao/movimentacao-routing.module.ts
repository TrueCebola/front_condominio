import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimentacaoComponent } from './movimentacao.component';

const routes: Routes = [{ path: '', component: MovimentacaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoRoutingModule { }
