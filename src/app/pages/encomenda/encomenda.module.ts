import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncomendaRoutingModule } from './encomenda-routing.module';
import { EncomendaComponent } from './encomenda.component';
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
  declarations: [
    EncomendaComponent
  ],
  imports: [
    CommonModule,
    EncomendaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PoPageModule,
    PoTableModule,
    PoTabsModule,
    PoModalModule,
    PoFieldModule,
    PoButtonModule,
  ]
})
export class EncomendaModule { }
