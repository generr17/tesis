import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { VideoService } from '../services/video.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-videos',
  templateUrl: './listado-videos.component.html',
  styleUrls: ['./listado-videos.component.scss']
})
export class ListadoVideosComponent implements OnInit {

  constructor(private videoService: VideoService,private tokenStorageService: TokenStorageService, public dialog: MatDialog, private router: Router) { }
  videos : Video[]=[];
  usuarioActual: any;
  mensaje = '';
  url: any;

  ngOnInit(): void {
    this.usuarioActual= this.tokenStorageService.obtenerUsuario();
   
    this.cargarVideos();
    
   
  }

  cargarVideos (){
    this.videoService.obtenerVideos(this.usuarioActual.equipoId).subscribe(
      (data) => {
       let videoDat = JSON.parse(data);
     
      for(let index=0; index<videoDat.length; index++){
        let date= new Date(videoDat[index].createdAt);
        let dt= new Date();
         
          this.videos.push(new Video(videoDat[index].id, videoDat[index].nombreusuario, videoDat[index].url, videoDat[index].imagen, date))
      }
    
      },
      err => {
        this.mensaje = err.error.message;
      }
    );

    
  
  }


  reproducirVideo(video: string, usuario: number){
    alert(video);
    var vid=[video, usuario];
    this.router.navigate(['video', video, usuario]);
  }
}


class Video {
  id: number;
  usuario: string;
  url: string;
  imagen:string;
  fecha: Date;
  constructor (id:number ,usuario:string, url: string, imagen:string, fecha: Date){
    this.id= id;
    this.usuario= usuario;
    this.url= url;
    this.imagen=imagen;
    this.fecha= fecha;
  }
}
