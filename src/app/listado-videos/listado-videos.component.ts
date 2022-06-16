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

  ngOnInit(): void {
    this.usuarioActual= this.tokenStorageService.obtenerUsuario();
   
    this.cargarVideos();

    console.log(this.videos);
  }

  cargarVideos (){
    this.videoService.obtenerVideos(this.usuarioActual.equipoId).subscribe(
      (data) => {
       let videoDat = JSON.parse(data);
      
      for (let i=0; i < videoDat.length; i++){
         this.videos.push(new Video(videoDat[i].id, videoDat[i].nombreusuario, videoDat[i].url, videoDat[i].createdAt));
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
  fecha: Date;
  constructor (id:number ,usuario:string, url: string, fecha: Date){
    this.id= id;
    this.usuario= usuario;
    this.url= url;
    this.fecha= fecha;
  }
}
