import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PortariaService {
  apiUrl = 'http://localhost:8000/api/portaria';
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get(this.apiUrl);
  }
  post(portaria: any) {
    return this.http.post(this.apiUrl, portaria);
  }
  put(id: number, portaria: any) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.put(url, portaria);
  }
  delete(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
