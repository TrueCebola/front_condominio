import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  apiUrl = 'http://localhost:8000/api/lote';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.apiUrl);
  }
  post(lote: any) {
    return this.http.post(this.apiUrl, lote);
  }
  put(id: number, lote: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, lote);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
