import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EncomendaService {
  apiUrl = 'http://localhost:8000/api/correios';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.apiUrl);
  }
  post(encomenda: any) {
    return this.http.post(this.apiUrl, encomenda);
  }
  put(id: number, encomenda: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, encomenda);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
