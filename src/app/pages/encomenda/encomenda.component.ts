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
import { EncomendaService } from 'src/app/services/encomenda.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { PortariaService } from 'src/app/services/portaria.service';

@Component({
  selector: 'app-encomenda',
  templateUrl: './encomenda.component.html',
  styleUrls: ['./encomenda.component.css'],
})
export class EncomendaComponent implements OnInit {
  apiUrl = 'http://localhost:8000/api/correios';
  constructor(
    private service: EncomendaService,
    private pessoaService: PessoaService,
    private portariaService: PortariaService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  form = new FormGroup({
    id_pessoa: new FormControl(),
    id_portaria: new FormControl(),
    observacoes: new FormControl(''),
    tipo_encomenda: new FormControl(''),
    active: new FormControl(),
  });
  actions: PoPageAction[] = [
    {
      label: 'Nova Encomenda',
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
      label: 'Portaria',
      property: 'id_portaria',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Observações',
      property: 'observacoes',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Tipo de Encomenda',
      property: 'tipo_encomenda',
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
    this.portariaService.get().subscribe({
      next: (data) => {
        let res = Object(data).data;
        if (res) {
          for (let i = 0; i < Object(res).length; i++) {
            this.portarias.push({
              label: Object(res)[i].portaria_nome,
              value: Object(res)[i].id,
            });
          }
          this.portarias = [...this.portarias];
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
              id_pessoa: this.pessoas.find(
                (pessoa) => pessoa.value === Object(res)[i].id_pessoa
              )?.label,
              id_portaria: this.portarias.find(
                (portaria) => portaria.value === Object(res)[i].id_portaria
              )?.label,
              observacoes: Object(res)[i].observacoes,
              tipo_encomenda: Object(res)[i].tipo_encomenda,
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
      id_pessoa: this.pessoas.find((pessoa) => pessoa.label === row.id_pessoa)
        ?.value,
      id_portaria: this.portarias.find(
        (portaria) => portaria.label === row.id_portaria
      )?.value,
      observacoes: row.observacoes,
      tipo_encomenda: row.tipo_encomenda,
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
