import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/test/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  editarUsuario(id:number, user:any): Observable<any> {
    return this.http.put(API_URL + 'editar/'+ id, 
    {
      nombreusuario:  user.nombreusuario,
      apellidousuario: user.apellidousuario,
      telefono: user.telefono,
      direccion: user.direccion,
      clave: user.clave
          
    }, httpOptions);
  }
   
  obtenerUsuarioPorId (id:number):Observable<any> {
   return this.http.get(API_URL + 'obtener/'+ id, {responseType: 'text'});
  }
  
  obtenerUPorId(id: number): Observable<any> {
    return this.http.get(API_URL + 'obtener/' + id);
  }
}
