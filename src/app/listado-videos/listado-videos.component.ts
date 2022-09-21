import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { VideoService } from '../services/video.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuscripcionesComponent } from '../suscripciones/suscripciones.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-listado-videos',
  templateUrl: './listado-videos.component.html',
  styleUrls: ['./listado-videos.component.scss']
})
export class ListadoVideosComponent implements OnInit {

  constructor(private videoService: VideoService,private tokenStorageService: TokenStorageService, public dialog: MatDialog, private usuarioService: UserService, private router: Router) { }
  videos : Video[]=[];
  usuarioActual: any;
  value: any;
  mensaje = '';
  url: any;
  pago:false;
  visto: number;
  habilidades: any[]=[];
  ngOnInit(): void {
    this.usuarioActual= this.tokenStorageService.obtenerUsuario();
    console.log(this.usuarioActual);
    this.cargarVideos();
    this.obtenerListaHabilidades();
   
  }

  cargarVideos (){
    this.videoService.obtenerVideos(this.usuarioActual.equipoId).subscribe(
      (data) => {
        this.videos = [];
       let videoDat = JSON.parse(data);
     console.log(videoDat);
      for(let index=0; index<videoDat.length; index++){
        let date= new Date(videoDat[index].createdAt);
        let dt= new Date();
        let usuario = videoDat[index].nombreusuario + " " + videoDat[index].apellidousuario;
          this.videos.push(new Video(videoDat[index].videoId, usuario, videoDat[index].url, videoDat[index].imagen, date, videoDat[index].titulo, videoDat[index].descripcion, videoDat[index].id))
      }
      
    
      },
      err => {
        this.mensaje = err.error.message;
      }
    );

    
  
  }

  cargarVideosNuevos (){
    this.videoService.obtenerVideosNoVistos(this.usuarioActual.equipoId).subscribe(
      (data) => {
        this.videos = [];
       let videoDat = JSON.parse(data);
       console.log("videos nuevos: ", videoDat);
       
      for(let index=0; index<videoDat.length; index++){
        let date= new Date(videoDat[index].createdAt);
        let dt= new Date();
        let usuario = videoDat[index].nombreusuario + " " + videoDat[index].apellidousuario;
          this.videos.push(new Video(videoDat[index].videoId, usuario, videoDat[index].url, videoDat[index].imagen, date, videoDat[index].titulo, videoDat[index].descripcion, videoDat[index].id))
      }
      },
      err => {
        this.mensaje = err.error.message;
      }
    );

    
  
  }

  cargarVideosVistos (){
    this.videoService.obtenerVideosVistos(this.usuarioActual.equipoId).subscribe(
      (data) => {
        this.videos = [];
       let videoDat = JSON.parse(data);
       this.visto = 1;
      for(let index=0; index<videoDat.length; index++){
        let date= new Date(videoDat[index].createdAt);
        let dt= new Date();
        let usuario = videoDat[index].nombreusuario + " " + videoDat[index].apellidousuario;
          this.videos.push(new Video(videoDat[index].videoId, usuario, videoDat[index].url, videoDat[index].imagen, date, videoDat[index].titulo, videoDat[index].descripcion, videoDat[index].id))
      }
      },
      err => {
        this.mensaje = err.error.message;
      }
    );

    
  
  }

  
  reproducirVideo(video: string, usuario: number, idVideo: number){
  
    if(this.usuarioActual.suscrito === 1){
      var vid=[video, usuario, idVideo];
      this.router.navigate(['video', video, usuario, idVideo]);
    }else  if(this.usuarioActual.suscrito === 0){
      const dialogRef = this.dialog.open(SuscripcionesComponent, {
        width: '570px',
        disableClose: true,
        hasBackdrop: true,
        data: {pago: this.pago},
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialogo cerrado: ', result);
        this.pago = result; 
        console.log(this.pago);
        if(this.pago){
          this.obtenerUsuarioPorId();
          console.log(result);
        }
      });
    }

   
  }

  obtenerUsuarioPorId(){
    this.usuarioService.obtenerUsuarioPorId(this.usuarioActual.id).subscribe(
      (data) => {
        let user = JSON.parse(data);
      this.usuarioActual.suscrito = user.suscrito;
       this.tokenStorageService.guardarUsuario(user);
       },
       err => {
         this.mensaje = err.error.message;
         
       }
    );
  }
  buscarVideos(){
    if( this.value){
    
        this.videoService.buscarVideos(this.usuarioActual.equipoId, this.value).subscribe(
          (data) => {
            this.videos = [];
           let videoDat = JSON.parse(data);
         
          for(let index=0; index<videoDat.length; index++){
            let date= new Date(videoDat[index].createdAt);
            let dt= new Date();
            let usuario = videoDat[index].nombreusuario + " " + videoDat[index].apellidousuario;
              this.videos.push(new Video(videoDat[index].videoId, usuario, videoDat[index].url, videoDat[index].imagen, date, videoDat[index].titulo, videoDat[index].descripcion,videoDat[index].id))
          }
          
        
          },
          err => {
            this.mensaje = err.error.message;
          }
        );
    
     
    }else {
     
        this.cargarVideos();
      
      
    }
    
  }

 filtrarVideos(texto: string){
  console.log(texto);
  this.videoService.listarVideosPorFiltro(this.usuarioActual.equipoId, texto).subscribe(
    (data) => {
      this.videos = [];
     let videoDat = JSON.parse(data);
   
    for(let index=0; index<videoDat.length; index++){
      let date= new Date(videoDat[index].createdAt);
      let dt= new Date();
      let usuario = videoDat[index].nombreusuario + " " + videoDat[index].apellidousuario;
        this.videos.push(new Video(videoDat[index].videoId, usuario, videoDat[index].url, videoDat[index].imagen, date, videoDat[index].titulo, videoDat[index].descripcion, videoDat[index].id))
    }
    
  
    },
    err => {
      this.mensaje = err.error.message;
    }
  );
 }

  obtenerListaHabilidades(){
    
    this.usuarioService.obtenerHabilidadesT().subscribe(
      (data) => {
       let habilidadesA = JSON.parse(data);
      
       for (let i=0; i < habilidadesA.length; i++){

         this.habilidades.push({id: habilidadesA[i].id, nombre: habilidadesA[i].nombre}); 
       }
      
     
      },
      err => {
        this.mensaje = err.error.message;
        
      }
    );
   
 };

 
}



class Video {
  id: number;
  usuario: string;
  url: string;
  imagen:string;
  titulo: string;
  descripcion: string;
  fecha: Date;
  idUsuario: number;
  constructor (id:number ,usuario:string, url: string, imagen:string, fecha: Date, titulo: string, descripcion: string, idUsuario: number){
    this.id= id;
    this.usuario= usuario;
    this.url= url;
    this.imagen=imagen;
    this.fecha= fecha;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.idUsuario = idUsuario ;
  }
}
