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
import { AutorizacaoAgendaService } from 'src/app/services/autorizacao.service';
import { LoteService } from 'src/app/services/lote.service';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { PortariaService } from 'src/app/services/portaria.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css'],
})
export class MovimentacaoComponent implements OnInit {
  apiUrl = 'http://localhost:8000/api/movimentacao';
  constructor(
    private service: MovimentacaoService,
    private autorizacaoService: AutorizacaoAgendaService,
    private loteService: LoteService,
    private pessoaService: PessoaService,
    private portariaService: PortariaService,
    private veiculoService: VeiculoService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  form = new FormGroup({
    tipo_movimentacao: new FormControl(''),
    id_pessoa: new FormControl(''),
    id_veiculo: new FormControl(''),
    id_autorizacao_agenda: new FormControl(''),
    id_local: new FormControl(''),
    id_portaria: new FormControl(''),
    observacoes: new FormControl(''),
  });
  actions: PoPageAction[] = [
    {
      label: 'Nova Movimentação',
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
      label: 'Tipo de Movimentação',
      property: 'tipo_movimentacao',
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
      label: 'Veículo',
      property: 'id_veiculo',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Autorizado por',
      property: 'id_autorizacao_agenda',
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
      label: 'Local',
      property: 'id_local',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Observações',
      property: 'observacoes',
      sortable: true,
      type: 'string',
    },
  ];
  tipo: PoRadioGroupOption[] = [
    {
      label: 'Entrada',
      value: 'Entrada',
    },
    {
      label: 'Saída',
      value: 'Saida',
    },
  ];
  items: any[] = [];
  autorizacoes: any[] = [];
  lotes: any[] = [];
  pessoas: any[] = [];
  portarias: any[] = [];
  veiculos: any[] = [];
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
    this.autorizacaoService.get().subscribe({
      next: (data) => {
        let res = Object(data).data;
        if (res) {
          for (let i = 0; i < Object(res).length; i++) {
            this.autorizacoes.push({
              label: this.pessoas.find(
                (pessoa) => pessoa.value === Object(res)[i].id_pessoa_autoriza
              )?.label,
              value: Object(res)[i].id_pessoa_autoriza,
            });
          }
          this.autorizacoes = [...this.autorizacoes];
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
            this.lotes.push({
              label: 'Lote ' + Object(res)[i].id_lote,
              value: Object(res)[i].id,
            });
          }
          this.lotes = [...this.lotes];
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
    this.veiculoService.get().subscribe({
      next: (data) => {
        let res = Object(data).data;
        if (res) {
          for (let i = 0; i < Object(res).length; i++) {
            this.veiculos.push({
              label: Object(res)[i].placa,
              value: Object(res)[i].id,
            });
          }
          this.veiculos = [...this.veiculos];
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
              id_portaria: this.portarias.find(
                (portaria) => portaria.value === Object(res)[i].id_portaria
              )?.label,
              id_pessoa: this.pessoas.find(
                (pessoa) => pessoa.value === Object(res)[i].id_pessoa
              )?.label,
              tipo_movimentacao: Object(res)[i].tipo_movimentacao,
              id_veiculo: this.veiculos.find(
                (veiculo) => veiculo.value === Object(res)[i].id_veiculo
              )?.label,
              id_local: this.lotes.find(
                (lote) => lote.value === Object(res)[i].id_local
              )?.label,
              id_autorizacao_agenda: this.autorizacoes.find(
                (autorizacao) =>
                  autorizacao.value === Object(res)[i].id_autorizacao_agenda
              )?.label,
              observacoes: Object(res)[i].observacoes,
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
      tipo_movimentacao: row.tipo_movimentacao,
      id_pessoa: this.pessoas.find((pessoa) => pessoa.label === row.id_pessoa)
        ?.value,
      id_veiculo: this.veiculos.find(
        (veiculo) => veiculo.label === row.id_veiculo
      )?.value,
      id_autorizacao_agenda: this.autorizacoes.find(
        (autorizacao) => autorizacao.label === row.id_autorizacao_agenda
      )?.value,
      id_local: this.lotes.find((lote) => lote.label === row.id_local)?.value,
      id_portaria: this.portarias.find(
        (portaria) => portaria.label === row.id_portaria
      )?.value,
      observacoes: row.observacoes,
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
