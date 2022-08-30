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
  ngOnInit(): void {
    this.usuarioActual= this.tokenStorageService.obtenerUsuario();
    console.log(this.usuarioActual);
    this.cargarVideos();
    
   
  }

  cargarVideos (){
    this.videoService.obtenerVideos(this.usuarioActual.equipoId).subscribe(
      (data) => {
        this.videos = [];
       let videoDat = JSON.parse(data);
     
      for(let index=0; index<videoDat.length; index++){
        let date= new Date(videoDat[index].createdAt);
        let dt= new Date();
          this.videos.push(new Video(videoDat[index].id, videoDat[index].nombreusuario, videoDat[index].url, videoDat[index].imagen, date, videoDat[index].titulo, videoDat[index].descripcion))
      }
      
    
      },
      err => {
        this.mensaje = err.error.message;
      }
    );

    
  
  }


  reproducirVideo(video: string, usuario: number){
    console.log(this.usuarioActual.suscrito);
   
    if(this.usuarioActual.suscrito === 1){
      var vid=[video, usuario];
      this.router.navigate(['video', video, usuario]);
    }else  if(this.usuarioActual.suscrito === 0){
      const dialogRef = this.dialog.open(SuscripcionesComponent, {
        width: '500px',
        //revisar
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
            this.videos.push(new Video(videoDat[index].id, videoDat[index].nombreusuario, videoDat[index].url, videoDat[index].imagen, date, videoDat[index].titulo, videoDat[index].descripcion))
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
}



class Video {
  id: number;
  usuario: string;
  url: string;
  imagen:string;
  titulo: string;
  descripcion: string;
  fecha: Date;

  constructor (id:number ,usuario:string, url: string, imagen:string, fecha: Date, titulo: string, descripcion: string){
    this.id= id;
    this.usuario= usuario;
    this.url= url;
    this.imagen=imagen;
    this.fecha= fecha;
    this.titulo = titulo;
    this.descripcion = descripcion;
  }
}
