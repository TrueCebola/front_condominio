import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = 'http://localhost:3000/usuario';
  constructor(private http: HttpClient, private storage: StorageService, private router: Router) {}

  get(login: any, password: any) {
    this.http.get(this.apiUrl).subscribe({
      next: (data) => {
        let array = [];
        let element;
        let found = false;
        for (let i = 0; i < Object(data).length; i++) {
          array.push({
            login: Object(data)[i].nome_usuario,
            password: Object(data)[i].senha,
            role: Object(data)[i].id_permissao,
          });
        }
        element = array.find((element: any) => {
          if (element.login === login && element.password === password) {
            return element;
          }
        });
        if (element) found = true;
        if (found) {
          this.storage.setUser(element?.login, element?.role);
          this.storage.setToken();
          this.router.navigate(['/']);
        }
        return;
      },
      error: (err) => {
        return;
      },
    });
  }
  // post(login: any) {
  // return this.http.post(this.apiUrl, login);
  // }
  // put(id: number, login: any) {
  //   let url = `${this.apiUrl}/${id}`;
  //   return this.http.put(url, login);
  // }
  // delete(id: number) {
  //   let url = `${this.apiUrl}/${id}`;
  //   return this.http.delete(url);
  // }
}
