import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  apiUrl = 'http://localhost:3000/pessoa';
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(this.apiUrl);
  }
  post(pessoa: any) {
    return this.http.post(this.apiUrl, pessoa);
  }
  put(id: number, pessoa: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, pessoa);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
