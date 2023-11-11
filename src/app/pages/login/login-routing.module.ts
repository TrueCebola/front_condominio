import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { userNotauthGuard } from '../../guards/user.notauth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [userNotauthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
