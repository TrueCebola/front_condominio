import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userNotauthGuard } from './guards/user.notauth.guard';
import { userAuthGuard } from './guards/user.auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [userNotauthGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'agendamento',
    canActivate: [userAuthGuard],
    loadChildren: () =>
      import('./pages/agendamento/agendamento.module').then(
        (m) => m.AgendamentoModule
      ),
  },
  {
    path: 'encomenda',
    canActivate: [userAuthGuard],
    loadChildren: () =>
      import('./pages/encomenda/encomenda.module').then(
        (m) => m.EncomendaModule
      ),
  },
  {
    path: 'propriedade',
    canActivate: [userAuthGuard],
    loadChildren: () =>
      import('./pages/propriedade/propriedade.module').then(
        (m) => m.PropriedadeModule
      ),
  },
  {
    path: 'movimentacao',
    canActivate: [userAuthGuard],
    loadChildren: () =>
      import('./pages/movimentacao/movimentacao.module').then(
        (m) => m.MovimentacaoModule
      ),
  },
  {
    path: 'pessoa',
    canActivate: [userAuthGuard],
    loadChildren: () =>
      import('./pages/pessoa/pessoa.module').then((m) => m.PessoaModule),
  },
  {
    path: 'portaria',
    canActivate: [userAuthGuard],
    loadChildren: () =>
      import('./pages/portaria/portaria.module').then((m) => m.PortariaModule),
  },
  {
    path: 'veiculo',
    canActivate: [userAuthGuard],
    loadChildren: () =>
      import('./pages/veiculo/veiculo.module').then((m) => m.VeiculoModule),
  },
  {
    path: 'tipo-pessoa',
    loadChildren: () =>
      import('./pages/tipo-pessoa/tipo-pessoa.module').then(
        (m) => m.TipoPessoaModule
      ),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./pages/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  { path: '', redirectTo: 'movimentacao', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
