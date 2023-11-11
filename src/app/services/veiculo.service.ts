import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  apiUrl = 'http://localhost:8000/api/veiculo';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.apiUrl);
  }
  post(veiculo: any) {
    return this.http.post(this.apiUrl, veiculo);
  }
  put(id: number, veiculo: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, veiculo);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
