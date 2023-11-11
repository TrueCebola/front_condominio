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
import { TipoPessoaService } from 'src/app/services/tipo-pessoa.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
})
export class PessoaComponent implements OnInit {
  apiUrl = 'http://localhost:8000/api/pessoa';
  constructor(
    private service: PessoaService,
    private tiposService: TipoPessoaService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  form = new FormGroup({
    nome: new FormControl(''),
    telefone: new FormControl(''),
    email: new FormControl(''),
    cpf_cnpj: new FormControl(''),
    rua: new FormControl(''),
    cidade: new FormControl(''),
    estado: new FormControl(''),
    cep: new FormControl(''),
    pais: new FormControl(''),
    tipo_pessoa: new FormControl(''),
    active: new FormControl(),
  });
  actions: PoPageAction[] = [
    {
      label: 'Nova Pessoa',
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
      property: 'nome',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Telefone',
      property: 'telefone',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Email',
      property: 'email',
      sortable: true,
      type: 'string',
    },
    {
      label: 'CPF/CNPJ',
      property: 'cpf_cnpj',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Rua',
      property: 'rua',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Cidade',
      property: 'cidade',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Estado',
      property: 'estado',
      sortable: true,
      type: 'string',
    },
    {
      label: 'CEP',
      property: 'cep',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Pais',
      property: 'pais',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Tipo de Pessoa',
      property: 'tipo_pessoa',
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
  tipos: any[] = [];
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
  telefone!: string;
  cpf_cnpj!: string;
  title = 'Cadastrar';
  loading = false;
  id!: number | undefined;
  id_linha!: number;
  index!: number;

  ngOnInit() {
    this.limparDados();
    this.tiposService.get().subscribe({
      next: (data) => {
        let res = Object(data).data;
        if (res) {
          for (let i = 0; i < Object(res).length; i++) {
            this.tipos.push({
              label: Object(res)[i].tipo,
              value: Object(res)[i].id,
            });
          }
          this.tipos = [...this.tipos];
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
            let tel = Object(res)[i].telefone;
            let doc = Object(res)[i].cpf_cnpj;
            let cep = Object(res)[i].cep;
            this.items.push({
              id: Object(res)[i].id,
              nome: Object(res)[i].nome,
              telefone:
                tel.length === 10
                  ? `(${tel.slice(0, 2)}) ${tel.slice(2, 6)}-${tel.slice(
                      6,
                      10
                    )}`
                  : `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(
                      7,
                      11
                    )}`,
              email: Object(res)[i].email,
              cpf_cnpj:
                doc.length === 11
                  ? `${doc.slice(0, 3)}.${doc.slice(3, 6)}.${doc.slice(
                      6,
                      9
                    )}-${doc.slice(9, 11)}`
                  : `${doc.slice(0, 2)}.${doc.slice(2, 5)}.${doc.slice(
                      5,
                      8
                    )}/${doc.slice(8, 12)}-${doc.slice(12, 14)}`,
              rua: Object(res)[i].rua,
              cidade: Object(res)[i].cidade,
              estado: Object(res)[i].estado,
              cep: `${cep.slice(0, 5)}-${cep.slice(5, 8)}`,
              pais: Object(res)[i].pais,
              tipo_pessoa: this.tipos.find(
                (tipo) => tipo.value === Object(res)[i].tipo_pessoa
              )?.label,
              active: Object(res)[i].active,
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

  mascara(type: string, value: any) {
    if (value) {
      if (type === 'tel') {
        this.telefone = value;
        if (value.length === 10) {
          this.form.controls['telefone'].patchValue(
            `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`
          );
        } else if (value.length === 11) {
          this.form.controls['telefone'].patchValue(
            `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`
          );
        }
        return;
      } else {
        this.cpf_cnpj = value;
        if (value.length === 11) {
          this.form.controls['cpf_cnpj'].patchValue(
            `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
              6,
              9
            )}-${value.slice(9, 11)}`
          );
        } else if (value.length === 14) {
          this.form.controls['cpf_cnpj'].patchValue(
            `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(
              5,
              8
            )}/${value.slice(8, 12)}-${value.slice(12, 14)}`
          );
        }
        return;
      }
    }
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
    let tel = row.telefone
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll(' ', '')
      .replaceAll('-', '');
    let doc = row.cpf_cnpj
      .replaceAll('-', '')
      .replaceAll('.', '')
      .replaceAll('/', '');
    this.mascara('tel', tel);
    this.mascara('doc', doc);
    this.form.patchValue({
      nome: row.nome,
      email: row.email,
      rua: row.rua,
      cidade: row.cidade,
      estado: row.estado,
      cep: row.cep,
      pais: row.pais,
      tipo_pessoa: this.tipos.find((tipo) => tipo.label === row.tipo_pessoa)
        ?.value,
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
      this.form.controls['telefone'].patchValue(
        this.form.value.telefone
          ?.replaceAll('(', '')
          .replaceAll(')', '')
          .replaceAll(' ', '')
          .replaceAll('-', '')!
      );
      this.form.controls['cpf_cnpj'].patchValue(
        this.form.value.cpf_cnpj
          ?.replaceAll('-', '')
          .replaceAll('.', '')
          .replaceAll('/', '')!
      );
      this.form.value.active = this.form.value.active === 1 ? true : false;
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
      this.form.controls['telefone'].patchValue(this.telefone);
      this.form.controls['cpf_cnpj'].patchValue(this.cpf_cnpj);
      this.form.value.active = this.form.value.active === 1 ? true : false;
      this.loading = true;
      setTimeout(() => {
        console.log(this.form.value);
        this.loading = false;
        this.service.post(this.form.value).subscribe({
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
