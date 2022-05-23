import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/equipo/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class EquipoService {
 
  constructor(private http:HttpClient) { }

  crearEquipo(equipo: any, serieId: any): Observable<any> {

    return this.http.post(API_URL + 'crear', {
        nombre: equipo.nombre,
        direccion: equipo.direccion,
        telefono: equipo.telefono,
        serieId: serieId
    }, httpOptions);
  };

  obtenerSeries(): Observable<any> {
  const listado= this.http.get('http://localhost:3000/api/serie/listar', {responseType: 'text'});
  return listado
  }

  obtenerEquipos(): Observable<any> {
    return this.http.get(API_URL + 'listar', {responseType: 'text'});
  }
  
}

