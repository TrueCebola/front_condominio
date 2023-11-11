import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoLanguage } from '@po-ui/ng-components';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private service: LoginService,
    private router: Router,
    private storage: StorageService
  ) {}
  isLoading = false;
  hideRemember = true;
  languages: Array<PoLanguage> = [{ language: 'pt', description: 'Português' }];
  literals: PoPageLoginLiterals = {
    loginErrorPattern: 'Login obrigatório',
    loginHint:
      'O usuário e a senha lhe foram informados pelo administrador do sistema.',
    loginLabel: 'Usuário',
    loginPlaceholder: '',
    passwordErrorPattern: 'Senha obrigatória',
    passwordLabel: 'Senha',
    passwordPlaceholder: '',
  };
  loginErrors: Array<string> = [];
  passwordErrors: Array<string> = [];
  logo = '../../../assets/logo.jpeg';

  navigate() {
    this.router.navigate(['']);
  }
  onSubmit(event: PoPageLogin) {
    let token;
    this.service.get(event.login, event.password);
    return;
  }
}
