import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipoPessoaService {
  apiUrl = 'http://localhost:3000/tipo';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.apiUrl);
  }
  post(tipo: any) {
    return this.http.post(this.apiUrl, tipo);
  }
  put(id: number, tipo: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, tipo);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
