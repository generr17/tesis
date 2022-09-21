import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';


 const API_URL = 'http://localhost:3000/api/video/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class VideoService {
 public URL = 'http://localhost:3000/api/video/subir';
 public URLS = 'http://localhost:3000/api/video/subirImagen';
  constructor(private http: HttpClient) { }
  guardarVideo(video: any, imagen: any, usuario:any, equipos:any, titulo: string, descripcion: string): Observable<any> {

    return this.http.post(API_URL+'guardar', {
      url:video,
      imagen: imagen,
      titulo: titulo,
      descripcion: descripcion,
      usuarioId:usuario,
      equipos: equipos
    }, httpOptions);
  };

 obtenerVideos(equipoId: number): Observable<any> {
    return this.http.get(API_URL+'obtenerVideos/' +equipoId, { responseType: 'text' });
    
 }

 listarVideos(usuarioId: number): Observable<any> {
  return this.http.get(API_URL+'listarVideos/' +usuarioId, { responseType: 'text' });
  
}

listarVideosNuevos(usuarioId: number): Observable<any> {
  return this.http.get(API_URL+'videosNoVistos/' +usuarioId, { responseType: 'text' });
}

listarVideosVistos(usuarioId: number): Observable<any> {
  return this.http.get(API_URL+'videosVistos/' +usuarioId, { responseType: 'text' });
}

 buscarVideos(equipoId: number, texto:string): Observable<any> {
  return this.http.get(API_URL + 'buscarVideos/'+equipoId+ '/' + texto, { responseType: 'text'});
 }

 listarVideosPorFiltro(equipoId: number, texto:string): Observable<any> {
  return this.http.get(API_URL + 'buscarVideosPorTipo/'+equipoId+ '/' + texto, { responseType: 'text'});
 }
obtenerVideosNoVistos(equipoId: number): Observable<any> {
  return this.http.get(API_URL + 'listarVideosNoVistos/'+equipoId, { responseType: 'text'});
 }

 obtenerVideosVistos(equipoId: number): Observable<any> {
  return this.http.get(API_URL + 'listarVideosVistos/'+equipoId, { responseType: 'text'});
 }

 buscarVideosDeUsuario(usuarioId: number, texto:string): Observable<any> {
  return this.http.get(API_URL + 'buscarVideosUsuario/'+usuarioId+ '/' + texto, { responseType: 'text'});
 }

 buscarVideosVistosDeUsuario(usuarioId: number, texto:string): Observable<any> {
  return this.http.get(API_URL + 'buscarVideosUsuario/'+usuarioId+ '/' + texto, { responseType: 'text'});
 }

 VideosVistosDeUsuario(usuarioId: number, texto:string): Observable<any> {
  return this.http.get(API_URL + 'buscarVideosVistos/'+usuarioId+ '/' + texto, { responseType: 'text'});
 }

 VideosNuevosDeUsuario(usuarioId: number, texto:string): Observable<any> {
  return this.http.get(API_URL + 'buscarVideosNuevos/'+usuarioId+ '/' + texto, { responseType: 'text'});
 }
 //
 obtenerSuscripciones(): Observable<any> {
  return this.http.get('http://localhost:3000/obtenerSuscripciones', { responseType: 'text' });
 }
 reproducirVideo(video:any): Observable<any> {
   return this.http.get(API_URL + "reproducir", video);
 }
  
 aditarEstadoVideo(id: number, equipo: number): Observable<any> {
  return this.http.put(API_URL + 'actualizarEstado', {
     videoId: id,
     equipoId: equipo
  }, httpOptions);
}

}
