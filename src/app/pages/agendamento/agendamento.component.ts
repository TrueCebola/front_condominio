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
import { AutorizacaoAgendaService } from 'src/app/services/autorizacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { PortariaService } from 'src/app/services/portaria.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
  apiUrl = 'http://localhost:8000/api/autoriza_agenda';
  constructor(
    private service: AutorizacaoAgendaService,
    private pessoaService: PessoaService,
    private veiculoService: VeiculoService,
    private portariaService: PortariaService,
    private notification: PoNotificationService
  ) {}
  @ViewChild('modalAgendamento', { static: true })
  modalAgendamento!: PoModalComponent;
  @ViewChild('modalAutorizacao', { static: true })
  modalAutorizacao!: PoModalComponent;
  formAgendamento = new FormGroup({
    id_pessoa_autoriza: new FormControl(),
    id_pessoa_entrada: new FormControl(),
    observacao: new FormControl(''),
    hora_data: new FormControl(),
    id_veiculo: new FormControl(),
    id_portaria: new FormControl(),
    tipo_autorizacao_agenda: new FormControl('agendamento'),
  });
  formAutorizacao = new FormGroup({
    id_pessoa_autoriza: new FormControl(),
    id_pessoa_entrada: new FormControl(),
    observacao: new FormControl(''),
    hora_data: new FormControl(),
    id_veiculo: new FormControl(),
    id_portaria: new FormControl(),
    tipo_autorizacao_agenda: new FormControl('autorizacao'),
  });
  pessoas: PoComboOption[] = [];
  veiculos: PoComboOption[] = [];
  portarias: PoComboOption[] = [];
  id_linha!: number;
  index!: number;
  idAgendamento!: number | undefined;
  actionsAgendamento: PoPageAction[] = [
    {
      label: 'Novo Agendamento',
      action: () => {
        this.title = 'Cadastrar';
        this.formAgendamento.reset();
        this.modalAgendamento.open();
      },
    },
  ];
  columnsAgendamento: PoTableColumn[] = [
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
      label: 'Autorizado por',
      property: 'id_pessoa_autoriza',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Pessoa',
      property: 'id_pessoa_entrada',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Observação',
      property: 'observacao',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Data',
      property: 'hora_data',
      sortable: true,
      type: 'dateTime',
    },
    {
      label: 'Veículo',
      property: 'id_veiculo',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Portaria',
      property: 'id_portaria',
      sortable: true,
      type: 'string',
    },
  ];
  statusAgendamento: PoRadioGroupOption[] = [
    {
      label: 'Ativo',
      value: 1,
    },
    {
      label: 'Inativo',
      value: 0,
    },
  ];
  itemsAgendamento: any[] = [];
  idAutorizacao!: number | undefined;
  actionsAutorizacao: PoPageAction[] = [
    {
      label: 'Nova Autorização',
      action: () => {
        this.title = 'Cadastrar';
        this.formAutorizacao.reset();
        this.modalAutorizacao.open();
      },
    },
  ];
  columnsAutorizacao: PoTableColumn[] = [
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
      label: 'Autorizado por',
      property: 'id_pessoa_autoriza',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Pessoa',
      property: 'id_pessoa_entrada',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Observação',
      property: 'observacao',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Data',
      property: 'hora_data',
      sortable: true,
      type: 'dateTime',
    },
    {
      label: 'Veículo',
      property: 'id_veiculo',
      sortable: true,
      type: 'string',
    },
    {
      label: 'Portaria',
      property: 'id_portaria',
      sortable: true,
      type: 'string',
    },
  ];
  statusAutorizacao: PoRadioGroupOption[] = [
    {
      label: 'Ativo',
      value: 1,
    },
    {
      label: 'Inativo',
      value: 0,
    },
  ];
  itemsAutorizacao: any[] = [];
  title = 'Cadastrar';
  loading = false;
  conteudo = 'agendamento';

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
            if (Object(res)[i].tipo_autorizacao_agenda === 'agendamento') {
              this.itemsAgendamento.push({
                id: Object(res)[i].id,
                id_pessoa_autoriza: this.pessoas.find(
                  (pessoa) => pessoa.value === Object(res)[i].id_pessoa_autoriza
                )?.label,
                id_pessoa_entrada: this.pessoas.find(
                  (pessoa) => pessoa.value === Object(res)[i].id_pessoa_entrada
                )?.label,
                observacao: Object(res)[i].observacao,
                hora_data: Object(res)[i].hora_data,
                id_veiculo: this.veiculos.find(
                  (veiculo) => veiculo.value === Object(res)[i].id_veiculo
                )?.label,
                id_portaria: this.portarias.find(
                  (portaria) => portaria.value === Object(res)[i].id_portaria
                )?.label,
                tipo_autorizacao_agenda: 'Agendamento',
              });
            } else {
              this.itemsAutorizacao.push({
                id: Object(res)[i].id,
                id_pessoa_autoriza: this.pessoas.find(
                  (pessoa) => pessoa.value === Object(res)[i].id_pessoa_autoriza
                )?.label,
                id_pessoa_entrada: this.pessoas.find(
                  (pessoa) => pessoa.value === Object(res)[i].id_pessoa_entrada
                )?.label,
                observacao: Object(res)[i].observacao,
                hora_data: Object(res)[i].hora_data,
                id_veiculo: this.veiculos.find(
                  (veiculo) => veiculo.value === Object(res)[i].id_veiculo
                )?.label,
                id_portaria: this.portarias.find(
                  (portaria) => portaria.value === Object(res)[i].id_portaria
                )?.label,
                tipo_autorizacao_agenda: 'Autorização',
              });
            }
          }
          this.itemsAgendamento = [...this.itemsAgendamento];
          this.itemsAutorizacao = [...this.itemsAutorizacao];
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
    this.pessoas = [];
    this.veiculos = [];
    this.portarias = [];
    this.itemsAgendamento = [];
    this.itemsAutorizacao = [];
  }
  fecharModal(page: string) {
    if (page === 'agendamento') {
      this.idAgendamento = undefined;
      this.formAgendamento.reset();
      this.modalAgendamento.close();
    } else {
      this.idAutorizacao = undefined;
      this.formAutorizacao.reset();
      this.modalAutorizacao.close();
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
    if (page === 'agendamento') {
      this.idAgendamento = id;
      let row = this.itemsAgendamento.find((item) => item.id === id);
      this.formAgendamento.patchValue({
        id_pessoa_autoriza: this.pessoas.find(
          (pessoa) => pessoa.label === row.id_pessoa_autoriza
        )?.value,
        id_pessoa_entrada: this.pessoas.find(
          (pessoa) => pessoa.label === row.id_pessoa_entrada
        )?.value,
        observacao: row.observacao,
        hora_data: new Date(row.hora_data),
        id_veiculo: this.veiculos.find(
          (veiculo) => veiculo.label === row.id_veiculo
        )?.value,
        id_portaria: this.portarias.find(
          (portaria) => portaria.label === row.id_portaria
        )?.value,
      });
      this.modalAgendamento.open();
    } else {
      this.idAutorizacao = id;
      let row = this.itemsAutorizacao.find((item) => item.id === id);
      this.formAutorizacao.patchValue({
        id_pessoa_autoriza: this.pessoas.find(
          (pessoa) => pessoa.label === row.id_pessoa_autoriza
        )?.value,
        id_pessoa_entrada: this.pessoas.find(
          (pessoa) => pessoa.label === row.id_pessoa_entrada
        )?.value,
        observacao: row.observacao,
        hora_data: new Date(row.hora_data),
        id_veiculo: this.veiculos.find(
          (veiculo) => veiculo.label === row.id_veiculo
        )?.value,
        id_portaria: this.portarias.find(
          (portaria) => portaria.label === row.id_portaria
        )?.value,
      });
      this.modalAutorizacao.open();
    }
  }
  selecionado(id: number) {
    this.id_linha = id;
  }
  apagar(id: number) {
    this.excluir(id);
  }
  private atualizar(page: string, id: number) {
    switch (page) {
      case 'agendamento':
        if (!this.formAgendamento.valid) {
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.service.put(id, this.formAgendamento.value).subscribe({
              error: (err) => {
                this.notification.error('Erro');
                return;
              },
              next: () => {
                this.notification.success('Sucesso');
                return;
              },
            });
            this.fecharModal('agendamento');
            window.location.reload();
          }, 700);
        }
        break;
      case 'autorizacao':
        if (!this.formAutorizacao.valid) {
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.service.put(id, this.formAutorizacao.value).subscribe({
              error: (err) => {
                this.notification.error('Erro');
                return;
              },
              next: () => {
                this.notification.success('Sucesso');
                return;
              },
            });
            this.fecharModal('autorizacao');
            window.location.reload();
          }, 700);
        }
        window.location.reload();
        break;
      default:
        break;
    }
  }
  private processar(page: string) {
    switch (page) {
      case 'agendamento':
        if (!this.formAgendamento.valid) {
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.service.post(this.formAgendamento.value).subscribe({
              error: (err) => {
                this.notification.error('Erro');
                return;
              },
              next: () => {
                this.notification.success('Sucesso');
                return;
              },
            });
            this.fecharModal('agendamento');
            window.location.reload();
          }, 700);
        }
        break;
      case 'autorizacao':
        if (!this.formAutorizacao.valid) {
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.service.post(this.formAutorizacao.value).subscribe({
              error: (err) => {
                this.notification.error('Erro');
                return;
              },
              next: () => {
                this.notification.success('Sucesso');
                return;
              },
            });
            this.fecharModal('autorizacao');
            window.location.reload();
          }, 700);
        }
        break;
      default:
        break;
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
