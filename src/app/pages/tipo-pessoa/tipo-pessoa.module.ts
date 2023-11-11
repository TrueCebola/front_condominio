import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoPessoaRoutingModule } from './tipo-pessoa-routing.module';
import { TipoPessoaComponent } from './tipo-pessoa.component';
import {
  PoButtonModule,
  PoFieldModule,
  PoModalModule,
  PoPageModule,
  PoTableModule,
  PoTabsModule,
} from '@po-ui/ng-components';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TipoPessoaComponent],
  imports: [
    CommonModule,
    TipoPessoaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PoPageModule,
    PoTableModule,
    PoTabsModule,
    PoModalModule,
    PoFieldModule,
    PoButtonModule,
  ],
})
export class TipoPessoaModule {}
