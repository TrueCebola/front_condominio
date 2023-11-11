import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import {
  PoButtonModule,
  PoFieldModule,
  PoModalModule,
  PoPageModule,
  PoTableModule,
  PoTabsModule,
} from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
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
export class UsuarioModule { }
