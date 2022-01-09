import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails() {
    return localStorage.getItem('userData') ? JSON.stringify(localStorage.getItem("userData")) : null;
  }
  setDataInLocalStorage(variableName: string, data: string) {
      localStorage.setItem(variableName, data);
  }
  getToken() {
      return localStorage.getItem('token');
  }
  clearStorage() {
      localStorage.clear();
  }
}
