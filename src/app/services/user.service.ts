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
   
  aditarSuscripcion(id: number, estado: any): Observable<any> {
    return this.http.put(API_URL + 'editarEstadoSuscripcion/'+ id, {
      suscrito: estado
    }, httpOptions);
  }
  obtenerUsuarioPorId (id:number):Observable<any> {
   return this.http.get(API_URL + 'obtener/'+ id, {responseType: 'text'});
  }
  
  obtenerHablidades():Observable<any> {
    return this.http.get(API_URL + 'obtenerHabilidades',{responseType: 'text'});
   }
  obtenerUPorId(id: number): Observable<any> {
    return this.http.get(API_URL + 'obtener/' + id);
  }

  obtenerHabilidadesT(): Observable<any> {
    return this.http.get(API_URL + 'obtenerHabilidades', {responseType: 'text'});
  }

  obtenerHabilidadesPorUsuario(id: number): Observable<any> {
    return this.http.get(API_URL + 'obtenerHabilidadesUsuario/' + id, {responseType: 'text'});
  }

  contarHabilidades(id: number): Observable<any> {
    return this.http.get(API_URL + 'contarHabilidadesUsuario/' + id, {responseType: 'text'});
  }

  contarMensajesNuevos(id:number): Observable<any>{
    return this.http.get('http://localhost:3000/api/contarNuevosMensajes/' + id, {responseType: 'text'});
  }
  guardarHabilidades(usuario:any, habilidades:any): Observable<any> {

    return this.http.post(API_URL+'guardarHabilidades', {
      usuarioId:usuario,
      habilidades: habilidades
    }, httpOptions);
  };

  guardarSuscripcionUsuario(usuario:any, suscripcion:any, tipo: any): Observable<any> {
    var CurrentDate = new Date();
  
    var fechaFin = CurrentDate;
    let mesActual = CurrentDate.getMonth();
    let añoActual= CurrentDate.getFullYear();
   
    if(tipo === "Mensual") {
      let mes= mesActual+1;
      if(mes > 12){
          mes = mes - 12;
          fechaFin.setFullYear(CurrentDate.getFullYear() + 1);
      } 
     
       fechaFin.setMonth(mes);
      
    } else if(tipo === "Semestral"){
      let mes= mesActual+6;
      if(mes > 12){
        mes = mes - 12;
        fechaFin.setFullYear(añoActual+ 1);
       } 
    fechaFin.setMonth(mes);
    } else if(tipo === "Anual"){
      fechaFin.setFullYear(añoActual+1);
    }
    console.log("Fecha inicial: ",CurrentDate);
    console.log("Fecha final: ", fechaFin);

    return this.http.post(API_URL+'guardarUsuarioSuscripcion', {
      usuarioId:usuario,
      suscripcionId: suscripcion,
      fechaInicio: new Date(),
      fechaFin: fechaFin
    }, httpOptions);
    
  };
 

  enviarMensaje(emisorId: number, receptorId: number, texto: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/enviarMensaje', {
      usuarioEmisor:emisorId,
      usuarioReceptor: receptorId,
      mensaje: texto
    }, httpOptions);
  };
  enviar(emisorId: number, chatRoomId:number, texto: string){
     return this.http.post('http://localhost:3000/api/enviar', {
      usuarioEmisor: emisorId,
      id: chatRoomId,
      mensaje: texto,
     });
  }

  obtenerChatRooms(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/api/obtenerChatRooms/' + id, {responseType: 'text'});
  };

  obtenerMensajes(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/api/obtenerMensajes/' + id, {responseType: 'text'});
  }

  aditarEstadoMensaje(emisorId: number, chatRoomId: number): Observable<any> {
    return this.http.put('http://localhost:3000/api/actualizarMensajes', {
       usuarioEmisor: emisorId,
       id: chatRoomId 
    }, httpOptions);
  }
}

