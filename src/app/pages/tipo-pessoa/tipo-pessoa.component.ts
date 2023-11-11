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
import { TipoPessoaService } from 'src/app/services/tipo-pessoa.service';

@Component({
  selector: 'app-tipo-pessoa',
  templateUrl: './tipo-pessoa.component.html',
  styleUrls: ['./tipo-pessoa.component.css'],
})
export class TipoPessoaComponent {
  apiUrl = 'http://localhost:3000/tipo';
  constructor(
    private service: TipoPessoaService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  form = new FormGroup({
    tipo: new FormControl(''),
  });
  actions: PoPageAction[] = [
    {
      label: 'Novo Tipo de Pessoa',
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
      label: 'Descrição',
      property: 'tipo',
      sortable: true,
      type: 'string',
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
    this.service.get().subscribe({
      next: (res) => {
        // let res = Object(data).data;
        if (res) {
          this.index = Object(res).length;
          for (let i = 0; i < Object(res).length; i++) {
            this.items.push({
              id: Object(res)[i].id,
              tipo: Object(res)[i].tipo,
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
      tipo: row.tipo,
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
