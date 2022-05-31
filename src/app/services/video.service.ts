import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';


 const API_URL = 'http://localhost:3000/api/video/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class VideoService {
 public URL = 'http://localhost:3000/api/video/subir';
  constructor(private http: HttpClient) { }
  guardarVideo(video: any, usuario:any, equipos:any): Observable<any> {

    return this.http.post(API_URL+'guardar', {
      url:video,
      usuarioId:usuario
    }, httpOptions);
  };

 
  
}
