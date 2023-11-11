import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiUrl = 'http://localhost:3000/usuario';
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get(this.apiUrl);
  }
  post(usuario: any) {
    return this.http.post(this.apiUrl, usuario);
  }
  put(id: number, usuario: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, usuario);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
