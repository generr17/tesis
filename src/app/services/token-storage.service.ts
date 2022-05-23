import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  cerrarsesion():void {
    window.sessionStorage.clear();
    
  }

  public guardarToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public obtenerToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public guardarUsuario(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public obtenerUsuario():any {
    const usuario = window.sessionStorage.getItem(USER_KEY);
    if (usuario){
      return  JSON.parse(usuario);
    }
    return {};
  }


}
