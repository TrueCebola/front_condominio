import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoPessoaComponent } from './tipo-pessoa.component';

const routes: Routes = [{ path: '', component: TipoPessoaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoPessoaRoutingModule { }
