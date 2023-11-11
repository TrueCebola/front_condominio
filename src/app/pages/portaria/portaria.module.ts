import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortariaRoutingModule } from './portaria-routing.module';
import { PortariaComponent } from './portaria.component';
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
    PortariaComponent
  ],
  imports: [
    CommonModule,
    PortariaRoutingModule,
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
export class PortariaModule { }
