import { Component } from '@angular/core';
import { PoNavbarIconAction, PoNavbarItem } from '@po-ui/ng-components';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private storage: StorageService) {};
  logo = '../../assets/logo.jpeg';
  iconActions: PoNavbarIconAction[] = [
    {
      label: 'Logout',
      icon: 'po-icon po-icon-exit',
      action: () => {
        this.storage.remove();
        window.location.assign(`${window.location.origin}/login`);
      },
    },
  ];
  items: PoNavbarItem[] = [
    {
      label: 'Agendamento',
      link: '/agendamento',
    },
    {
      label: 'Encomenda',
      link: '/encomenda',
    },
    {
      label: 'Movimentacao',
      link: '/movimentacao',
    },
    {
      label: 'Pessoa',
      link: '/pessoa',
    },
    {
      label: 'Portaria',
      link: '/portaria',
    },
    {
      label: 'Propriedade',
      link: '/propriedade',
    },
    {
      label: 'Tipo de Pessoa',
      link: '/tipo-pessoa',
    },
    {
      label: 'Usuários',
      link: '/usuario',
    },
    {
      label: 'Veiculo',
      link: '/veiculo',
    },
  ];
}
