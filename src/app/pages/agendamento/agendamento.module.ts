import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { AgendamentoComponent } from './agendamento.component';
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
  declarations: [AgendamentoComponent],
  imports: [
    CommonModule,
    AgendamentoRoutingModule,
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
export class AgendamentoModule {}
