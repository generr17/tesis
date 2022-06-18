import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../perfil/perfil.component';
import { EquipoService } from '../services/equipo.service';
import { Equipo } from '../modelos/equipo.model';
import { VideoService } from '../services/video.service';
import { Serie } from '../modelos/serie.model';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
 
   
  
  equipos: Equipo[]=[];
  series: Serie[] = [];
  Series : Serie[] = [];
  equiposOpciones: Equipo[]=[];
  seleccionados: number[]=[];
  equiposSA: Equipo[]=[];
  equiposSB: Equipo[]=[];
  mensaje= '';
  form :any= {};
  esExitoso=false;
  esRegistroFallido=false;
  @Input()
  requiredFileType:string;
  vi='';
  cargando= false;
 
  private  fileTemp:any;
  constructor(private userService: UserService, private videoService: VideoService,private tokenStorageService: TokenStorageService, public dialog: MatDialog, private equipoService: EquipoService) { }
  public uploader: FileUploader = new FileUploader({
    url: this.videoService.URL,
    itemAlias: 'video'
  });
  
  cerrarsesion() {
    this.tokenStorageService.cerrarsesion();
    window.location.reload();
    window.location.pathname='login';
  }
   
  abrirInformacionUsuario(){
    const dialogRef = this.dialog.open(PerfilComponent);
    
  }

  
  ngOnInit(): void {
    
    this.obtenerListaSeries();
    this.obtenerListaEquipo();
 
    this.subirVideo();
  
  }

  obtenerListaEquipo(){
      this.equipoService.obtenerEquipos().subscribe(
        (data) => {
         let equipoDat = JSON.parse(data);
         for (let i=0; i < equipoDat.length; i++){
            if(equipoDat[i].serieId == 1){
              this.equiposSA.push(new Equipo(Number(equipoDat[i].id),equipoDat[i].nombre,equipoDat[i].telefono, equipoDat[i].direccion, equipoDat[i].serieId));
             } else if( equipoDat[i].serieId == 2){
              this.equiposSB.push(new Equipo(Number(equipoDat[i].id),equipoDat[i].nombre,equipoDat[i].telefono, equipoDat[i].direccion, equipoDat[i].serieId)); 
             }
             this.equipos.push(new Equipo(Number(equipoDat[i].id),equipoDat[i].nombre,equipoDat[i].telefono, equipoDat[i].direccion, equipoDat[i].serieId)); 
             
          }
        },
        err => {
          this.mensaje = err.error.message;
        }
      );
    
    

    
  }

  obtenerListaSeries(){
    
    this.equipoService.obtenerSeries().subscribe(
      (data) => {
       let seriesA = JSON.parse(data);
       this.Series = seriesA;
       
       for (let i=0; i < seriesA.length; i++){

         this.series.push(new Serie(Number(seriesA[i].id),seriesA[i].nombre )); 
       }
      
      this.cargando= false;
      },
      err => {
        this.mensaje = err.error.message;
        this.cargando= false;
      }
    );
   
 }

 cargarEquipos(){
  
   if(this.form.serieId){
    var seriesID=this.form.serieId;
    
    if(seriesID.length == 1){
     
      if(seriesID[0].nombre == "A"){
        this.equiposOpciones = this.equiposSA;
       }else if(seriesID[0].nombre =="B"){
         this.equiposOpciones = this.equiposSB;
       }
    }else{
      this.equiposOpciones= this.equipos;
    }
  }
   
    
 }

 subirVideo(){
   
    this.uploader.onAfterAddingFile=(file: any) => {
      file.withCredentials = false;
     console.log(file.file.size)
    };
      this.uploader.onCompleteItem = (item:any, status: any) => {
        //console.log('Detalles del video a subir:' )
       // console.log(item);
        let resp=JSON.parse(item._xhr.responseText);

        const videoUrl = resp.message;
        const result=resp.success;
        const image= resp.imagenUrl;
        console.log(videoUrl); 
        if(result){
    
         this.vi = videoUrl;
         
         
        //this.subirImagen(this.vi);
        

        if (this.form.equipoId.length>0) {
          //var equip= this.form.equipoId;
          for(let i=0; i < this.form.equipoId.length; i++){
           
                this.seleccionados.push(Number(this.form.equipoId[i].id)); 
            
          }
         }else{
           for(let i=0; i < this.equiposSB.length; i++){
           
             this.seleccionados.push(Number(this.equiposSB[i].id)); 
           }
         }
        
        this.videoService.guardarVideo(videoUrl,image, this.tokenStorageService.obtenerUsuario().id,this.seleccionados).subscribe(
          data => {
            console.log(data);
            this.esExitoso = true;
            this.esRegistroFallido = false;
          },
          err => {
            this.mensaje = err.error.message;
            this.esRegistroFallido = true;
          }
        )
        }
      }
  
 }


    


}