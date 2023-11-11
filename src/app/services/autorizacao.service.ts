import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutorizacaoAgendaService {
  apiUrl = 'http://localhost:8000/api/autoriza_agenda';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.apiUrl);
  }
  post(autorizacao: any) {
    return this.http.post(this.apiUrl, autorizacao);
  }
  put(id: number, autorizacao: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, autorizacao);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
