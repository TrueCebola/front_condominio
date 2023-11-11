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
import { CondominioService } from 'src/app/services/condominio.service';
import { LoteService } from 'src/app/services/lote.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-propriedade',
  templateUrl: './propriedade.component.html',
  styleUrls: ['./propriedade.component.css'],
})
export class PropriedadeComponent implements OnInit {
  loteApiUrl = 'http://localhost:8000/api/lote';
  condominioApiUrl = 'http://localhost:8000/api/condominio';
  constructor(
    private loteService: LoteService,
    private condominioService: CondominioService,
    private pessoaService: PessoaService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modalLote', { static: true }) modalLote!: PoModalComponent;
  @ViewChild('modalCondominio', { static: true })
  modalCondominio!: PoModalComponent;
  formLote = new FormGroup({
    id_pessoa: new FormControl(''),
    estado: new FormControl(''),
  });
  formCondominio = new FormGroup({
    lote_numero: new FormControl(''),
    quadra: new FormControl(''),
  });
  actionsLote: PoPageAction[] = [
    {
      label: 'Novo Lote',
      action: () => {
        this.title = 'Cadastrar';
        this.formLote.reset();
        this.modalLote.open();
      },
    },
  ];
  actionsCondominio: PoPageAction[] = [
    {
      label: 'Novo Condomínio',
      action: () => {
        this.title = 'Cadastrar';
        this.formCondominio.reset();
        this.modalCondominio.open();
      },
    },
  ];
  columnsLote: PoTableColumn[] = [
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
      label: 'Estado',
      property: 'estado',
      sortable: true,
      type: 'string',
    },
  ];
  itemsLote: any[] = [];
  columnsCondominio: PoTableColumn[] = [
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
      label: 'Nº de Lotes',
      property: 'lote_numero',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Quadra',
      property: 'quadra',
      sortable: true,
      type: 'string',
    },
  ];
  itemsCondominio: any[] = [];
  title = 'Cadastrar';
  loading = false;
  idLote!: number | undefined;
  idCondominio!: number | undefined;
  pessoas: any[] = [];
  conteudo = 'lote';
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
    this.loteService.get().subscribe({
      next: (data) => {
        let res = Object(data).data;
        if (res) {
          for (let i = 0; i < Object(res).length; i++) {
            this.itemsLote.push({
              id: Object(res)[i].id,
              id_pessoa: this.pessoas.find(
                (pessoa) => pessoa.value === Object(res)[i].id_pessoa
              )?.label,
              estado: Object(res)[i].estado,
            });
          }
          this.itemsLote = [...this.itemsLote];
        }
        return;
      },
      error: (err) => {
        this.notification.error('Erro');
        return;
      },
    });
    this.condominioService.get().subscribe({
      next: (data) => {
        let res = Object(data).data;
        if (res) {
          for (let i = 0; i < Object(res).length; i++) {
            this.itemsCondominio.push({
              id: Object(res)[i].id,
              lote_numero: Object(res)[i].lote_numero,
              quadra: Object(res)[i].quadra,
            });
          }
          this.itemsCondominio = [...this.itemsCondominio];
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
    this.itemsLote = [];
    this.itemsCondominio = [];
  }
  fecharModal(page: string) {
    if (page === 'lote') {
      this.idLote = undefined;
      this.formLote.reset();
      this.modalLote.close();
    } else {
      this.idCondominio = undefined;
      this.formCondominio.reset();
      this.modalCondominio.close();
    }
  }

  salvar(page: string, id?: number) {
    if (id) {
      this.atualizar(page, id);
    } else {
      this.processar(page);
    }
  }
  editar(page: string, id: number) {
    this.title = 'Atualizar';
    if (page === 'lote') {
      this.idLote = id;
      let row = this.itemsLote.find((item) => item.id === id);
      this.formLote.patchValue({
        id_pessoa: this.pessoas.find((pessoa) => pessoa.label === row.id_pessoa)
          ?.value,
        estado: row.estado,
      });
      this.modalLote.open();
    } else {
      this.idCondominio = id;
      let row = this.itemsCondominio.find((item) => item.id === id);
      this.formCondominio.patchValue({
        lote_numero: row.lote_numero,
        quadra: row.quadra,
      });
      this.modalCondominio.open();
    }
  }
  selecionado(id: number) {
    this.id_linha = id;
  }
  apagar(page: string, id: number) {
    this.excluir(page, id);
  }
  private atualizar(page: string, id: number) {
    switch (page) {
      case 'lote':
        if (!this.formLote.valid) {
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.notification.success('Sucesso');
            this.loteService.put(id, this.formLote.value).subscribe({
              error: (err) => {
                this.notification.error('Erro');
                return;
              },
              next: () => {
                this.notification.success('Sucesso');
                return;
              },
            });
            this.fecharModal('lote');
            window.location.reload();
          }, 700);
        }
        break;
      case 'condominio':
        if (!this.formCondominio.valid) {
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.notification.success('Sucesso');
            this.condominioService
              .put(id, this.formCondominio.value)
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
            this.fecharModal('condominio');
            window.location.reload();
          }, 700);
        }
        break;
      default:
        break;
    }
  }

  private processar(page: string) {
    switch (page) {
      case 'lote':
        if (!this.formLote.valid) {
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.loteService.post(this.formLote.value).subscribe({
              error: (err) => {
                this.notification.error('Erro');
                return;
              },
              next: () => {
                this.notification.success('Sucesso');
                return;
              },
            });
            this.fecharModal('lote');
            window.location.reload();
          }, 700);
        }
        break;
      case 'condominio':
        if (!this.formCondominio.valid) {
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.condominioService.post(this.formCondominio.value).subscribe({
              error: (err) => {
                this.notification.error('Erro');
                return;
              },
              next: () => {
                this.notification.success('Sucesso');
                return;
              },
            });
            this.fecharModal('condominio');
            window.location.reload();
          }, 700);
        }
        break;
      default:
        break;
    }
  }
  private excluir(page: string, id: number) {
    switch (page) {
      case 'lote':
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.loteService.delete(id).subscribe({
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
        break;
      case 'condominio':
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.condominioService.delete(id).subscribe({
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
        break;
      default:
        break;
    }
  }
}
