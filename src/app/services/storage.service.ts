import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  auth(username: any, role: any) {
    this.setToken();
    this.setUser(username, role);
  }
  setToken() {
    let token = this.generateToken();
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }
  setUser(username: any, role: any) {
    localStorage.removeItem('username');
    localStorage.setItem('username', username);
    localStorage.removeItem('role');
    localStorage.setItem('role', role);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUser() {
    return localStorage.getItem('username');
  }
  getRole() {
    return localStorage.getItem('role');
  }
  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
  private generateToken() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 16) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
