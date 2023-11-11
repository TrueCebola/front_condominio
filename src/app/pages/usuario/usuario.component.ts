import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  PoComboOption,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoRadioGroupOption,
  PoTableColumn,
} from '@po-ui/ng-components';
import { PessoaService } from 'src/app/services/pessoa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  apiUrl = 'http://localhost:3000/usuario';
  constructor(
    private service: UsuarioService,
    private pessoaService: PessoaService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  form = new FormGroup({
    id_pessoa: new FormControl(),
    nome_usuario: new FormControl(''),
    senha: new FormControl(''),
    active: new FormControl(),
  });
  actions: PoPageAction[] = [
    {
      label: 'Novo Usuário',
      action: () => {
        this.title = 'Cadastrar';
        this.form.reset();
        this.modal.open();
      },
    },
  ];
  columns: PoTableColumn[] = [
    {
      label: ' ',
      property: 'edit',
      width: '93px',
      sortable: false,
      type: 'cellTemplate',
    },
    {
      label: 'ID',
      property: 'id',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Pessoa',
      property: 'id_pessoa',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Nome de Usuário',
      property: 'nome_usuario',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Status',
      property: 'active',
      sortable: true,
      type: 'boolean',
      boolean: {
        trueLabel: 'Ativo',
        falseLabel: 'Inativo',
      },
    },
  ];
  status: PoRadioGroupOption[] = [
    {
      label: 'Ativo',
      value: 1,
    },
    {
      label: 'Inativo',
      value: 0,
    },
  ];
  items: any[] = [];
  pessoas: PoComboOption[] = [];
  portarias: PoComboOption[] = [];
  title = 'Cadastrar';
  loading = false;
  id!: number | undefined;
  id_linha!: number;
  index!: number;

  ngOnInit() {
    this.limparDados();
    this.pessoaService.get().subscribe({
      next: (res: any) => {
        if (res) {
          for (let i = 0; i < Object(res).length; i++) {
            this.pessoas.push({
              label: Object(res)[i].nome,
              value: Object(res)[i].id,
            });
          }
          this.pessoas = [...this.pessoas];
        }
        return;
      },
      error: (err) => {
        this.notification.error('Erro');
        return;
      },
    });
    this.service.get().subscribe({
      next: (res: any) => {
        if (res) {
          this.index = Object(res).length;
          for (let i = 0; i < Object(res).length; i++) {
            this.items.push({
              id: Object(res)[i].id,
              id_pessoa: this.pessoas.find(
                (pessoa) => pessoa.value === Object(res)[i].id_pessoa
              )?.label,
              nome_usuario: Object(res)[i].nome_usuario,
              active: Object(res)[i].active === 1 ? true : false,
            });
          }
          this.items = [...this.items];
        }
        return;
      },
      error: (err: any) => {
        this.notification.error('Erro');
        return;
      },
    });
  }

  limparDados() {
    this.items = [];
  }
  fecharModal() {
    this.id = undefined;
    this.form.reset();
    this.modal.close();
  }
  salvar(id?: number) {
    if (id) {
      this.atualizar(id);
    } else {
      this.processar();
    }
  }
  editar(id: number) {
    this.id = id;
    this.title = 'Atualizar';
    let row = this.items.find((item) => item.id === id);
    this.form.patchValue({
      id_pessoa: this.pessoas.find((pessoa) => pessoa.label === row.id_pessoa)
        ?.value,
      nome_usuario: row.nome_usuario,
      senha: row.senha,
      active: row.active === true ? 1 : 0,
    });
    this.modal.open();
  }
  selecionado(id: number) {
    this.id_linha = id;
  }
  apagar(id: number) {
    this.excluir(id);
  }
  private atualizar(id: number) {
    if (!this.form.valid) {
      return;
    } else {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        console.log(this.form.value);
        this.service.put(id, { id: id, ...this.form.value }).subscribe({
          error: (err: any) => {
            this.notification.error('Erro');
            return;
          },
          next: () => {
            this.notification.success('Sucesso');
            return;
          },
        });
        this.fecharModal();
        window.location.reload();
      }, 700);
    }
  }
  private processar() {
    if (!this.form.valid) {
      return;
    } else {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.service
          .post({ id: this.index + 1, ...this.form.value })
          .subscribe({
            error: (err: any) => {
              this.notification.error('Erro');
              return;
            },
            next: () => {
              this.notification.success('Sucesso');
              return;
            },
          });
        this.fecharModal();
        window.location.reload();
      }, 700);
    }
  }
  private excluir(id: number) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.service.delete(id).subscribe({
        error: (err: any) => {
          this.notification.error('Erro');
          return;
        },
        next: () => {
          this.notification.success('Sucesso');
          return;
        },
      });
      this.fecharModal;
      window.location.reload();
    }, 700);
  }
}
