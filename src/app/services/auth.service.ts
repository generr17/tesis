import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}, )
  
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  iniciarsesion(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'iniciarsesion', {
      email: credentials.email,
      clave: credentials.clave
    }, httpOptions);
  }

  registar(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'crearcuenta', {
        nombreusuario: user.nombreusuario,
        apellidousuario: user.apellidousuario,
        telefono: user.telefono,
        fechanacimiento: user.fechanacimiento,
        genero: user.genero,
        direccion: user.direccion,
        email: user.email,
        clave: user.clave,
        roleId: 3
    }, httpOptions);
  }
  
  registrarDirectivo(usuario: any, equipoId: any): Observable<any> {
    return this.http.post(AUTH_API + 'crearcuenta', {
      nombreusuario: usuario.nombreusuario,
      apellidousuario: usuario.apellidousuario,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      email: usuario.email,
      clave: usuario.clave,
      roleId:2,
      equipoId: equipoId
    }, httpOptions);
  }
 
}
