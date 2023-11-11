import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropriedadeRoutingModule } from './propriedade-routing.module';
import { PropriedadeComponent } from './propriedade.component';
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
    PropriedadeComponent
  ],
  imports: [
    CommonModule,
    PropriedadeRoutingModule,
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
export class PropriedadeModule { }
