import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CondominioService {
  apiUrl = 'http://localhost:8000/api/condominio';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.apiUrl);
  }
  post(condominio: any) {
    return this.http.post(this.apiUrl, condominio);
  }
  put(id: number, condominio: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, condominio);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
