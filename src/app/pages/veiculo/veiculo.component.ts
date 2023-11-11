import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  PoModalAction,
  PoModalComponent,
  PoPageAction,
  PoNotificationService,
  PoTableColumn,
  PoRadioGroupOption,
} from '@po-ui/ng-components';
import { PessoaService } from 'src/app/services/pessoa.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css'],
})
export class VeiculoComponent implements OnInit {
  apiUrl = 'http://localhost:8000/api/veiculo';
  constructor(
    private service: VeiculoService,
    private pessoaService: PessoaService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  form = new FormGroup({
    id_pessoa: new FormControl(''),
    placa: new FormControl(''),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    cor: new FormControl(''),
    ano: new FormControl(''),
  });
  actions: PoPageAction[] = [
    {
      label: 'Novo Veículo',
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
      label: 'Placa',
      property: 'placa',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Marca',
      property: 'marca',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Modelo',
      property: 'modelo',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Cor',
      property: 'cor',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Ano',
      property: 'ano',
      sortable: true,
      type: 'string',
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
  pessoas: any[] = [];
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
              id_pessoa: this.pessoas.find(
                (pessoa) => pessoa.value === Object(res)[i].id_pessoa
              )?.label,
              placa: Object(res)[i].placa,
              marca: Object(res)[i].marca,
              modelo: Object(res)[i].modelo,
              cor: Object(res)[i].cor,
              ano: Object(res)[i].ano,
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
      placa: row.placa,
      marca: row.marca,
      modelo: row.modelo,
      cor: row.cor,
      ano: row.ano,
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
      this.form.value.placa = this.form.value.placa?.toUpperCase();
      setTimeout(() => {
        this.loading = false;
        this.service.put(id, { id: id, ...this.form.value }).subscribe({
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
      this.form.value.placa = this.form.value.placa?.toUpperCase();
      setTimeout(() => {
        this.loading = false;
        this.service
          .post({ id: this.index + 1, ...this.form.value })
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
