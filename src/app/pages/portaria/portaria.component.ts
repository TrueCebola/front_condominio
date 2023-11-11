import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoRadioGroupOption,
  PoTableColumn,
} from '@po-ui/ng-components';
import { PessoaService } from 'src/app/services/pessoa.service';
import { PortariaService } from 'src/app/services/portaria.service';

@Component({
  selector: 'app-portaria',
  templateUrl: './portaria.component.html',
  styleUrls: ['./portaria.component.css'],
})
export class PortariaComponent implements OnInit {
  apiUrl = 'http://localhost:8000/api/portaria';
  pessoaUrl = 'http://localhost:8000/api/pessoa';
  constructor(
    private service: PortariaService,
    private pessoaService: PessoaService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  form = new FormGroup({
    portaria_nome: new FormControl(''),
    id_pessoa_funcionario: new FormControl(''),
    turno_trabalho: new FormControl(''),
    active: new FormControl(),
  });
  actions: PoPageAction[] = [
    {
      label: 'Nova Portaria',
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
      label: 'Nome',
      property: 'portaria_nome',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Funcionário',
      property: 'id_pessoa_funcionario',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Turno de Trabalho',
      property: 'turno_trabalho',
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
  items: any[] = [];
  pessoas: any[] = [];
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
  title = 'Cadastrar';
  loading = false;
  id!: number | undefined;
  id_linha!: number;
  index!: number;

  ngOnInit() {
    this.limparDados();
    this.pessoaService.get().subscribe({
      next: (data) => {
        let res = Object(data).data;
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
      next: (data) => {
        let res = Object(data).data;
        if (res) {
          this.index = Object(res).length;
          for (let i = 0; i < Object(res).length; i++) {
            this.items.push({
              id: Object(res)[i].id,
              portaria_nome: Object(res)[i].portaria_nome,
              id_pessoa_funcionario: this.pessoas.find(
                (pessoa) => pessoa.value === Object(res)[i].id_pessoa_funcionario
              )?.label,
              turno_trabalho: Object(res)[i].turno_trabalho,
              active: Object(res)[i].active === 1 ? true : false,
            });
          }
          this.items = [...this.items];
        }
        return;
      },
      error: (err) => {
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
      portaria_nome: row.portaria_nome,
      id_pessoa_funcionario: this.pessoas.find(
        (pessoa) => pessoa.label === row.id_pessoa_funcionario
      )?.value,
      turno_trabalho: row.turno_trabalho,
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
        this.service.put(id, this.form.value).subscribe({
          error: (err) => {
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
          .post(this.form.value)
          .subscribe({
            error: (err) => {
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
        error: (err) => {
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
