import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-mis-videos',
  templateUrl: './mis-videos.component.html',
  styleUrls: ['./mis-videos.component.scss']
})
export class MisVideosComponent implements OnInit {
  tokenS: any;
  cargando = false;
  constructor(private videoService: VideoService,private tokenStorageService: TokenStorageService) { }
  videos : any[]= [];
  usuarioActual: any = {};
   value: any;
   mensaje: string;
  ngOnInit(): void {
    this.tokenS = this.tokenStorageService.obtenerToken();
    if(this.tokenS){
      this.usuarioActual = this.tokenStorageService.obtenerUsuario();
    this.cargarVideos();
    }else{
      this.cargando = true;
    }
    
  }

  reproducirVideo(videoUrl: string) {

  }

  cargarVideos (){
    this.videoService.listarVideos(this.usuarioActual.id).subscribe(
      (data) => {
        this.videos = [];
       let videoDat = JSON.parse(data);
        console.log(videoDat);
      for(let index=0; index<videoDat.length; index++){
        let date= new Date(videoDat[index].createdAt);
        let dt= new Date();
          this.videos.push({ id: videoDat[index].id, url: videoDat[index].url, imagen: videoDat[index].imagen, fecha: date, titulo: videoDat[index].titulo, descripcion:  videoDat[index].descripcion});
      }
       this.cargando = true;
      },
      err => {
        this.mensaje = err.error.message;
      }
    );

    
  
  }

  buscarVideos(){
    if( this.value){
      this.videoService.buscarVideosDeUsuario(this.usuarioActual.id, this.value).subscribe(
        (data) => {
          this.videos = [];
         let videoDat = JSON.parse(data);
       
        for(let index=0; index<videoDat.length; index++){
          let date= new Date(videoDat[index].createdAt);
          let dt= new Date();
          this.videos.push({ id: videoDat[index].id, url: videoDat[index].url, imagen: videoDat[index].imagen, fecha: date, titulo: videoDat[index].titulo, descripcion:  videoDat[index].descripcion});
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
