import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../perfil/perfil.component';
import { EquipoService } from '../services/equipo.service';
import { Equipo } from '../modelos/equipo.model';
import { VideoService } from '../services/video.service';
import { Serie } from '../modelos/serie.model';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
 
   
  
  equipos: Equipo[]=[];
  series: Serie[] = [];
  equiposOpciones: Equipo[]=[];
  seleccionados: string[]=[];
  mensaje= '';
  form :any= {};
  esExitoso=false;
  @Input()
  requiredFileType:string;
  fileName= '';
  constructor(private userService: UserService, private videoService: VideoService,private tokenStorageService: TokenStorageService, public dialog: MatDialog, private equipoService: EquipoService) { }
 

  cerrarsesion() {
    this.tokenStorageService.cerrarsesion();
    window.location.reload();
    window.location.pathname='login';
  }
   
  abrirInformacionUsuario(){
    const dialogRef = this.dialog.open(PerfilComponent);
    
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this.videoService.guardarVideo(formData).subscribe();
    
    }
  }
  ngOnInit(): void {
   /* this.userService.obtenerContenidoUsuario().subscribe(
      data => {
        this.contenido = data;
      },
      err => {
        this.contenido = JSON.parse(err.error).message;
      }
    );*/

    this.obtenerListaEquipo();
    this.obtenerListaSeries();
  }
  obtenerListaEquipo(){
    this.equipoService.obtenerEquipos().subscribe(
      (data) => {
       let equipoDat = JSON.parse(data);
       for (let i=0; i < equipoDat.length; i++){
         
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
       for (let i=0; i < seriesA.length; i++){
         this.series.push(new Serie(Number(seriesA[i].id),seriesA[i].nombre )); 
       }
      },
      err => {
        this.mensaje = err.error.message;
      }
    );
 }

 cargarEquipos(){
   if(this.form.serieId){
    var seriesID=this.form.serieId;
    console.log(seriesID[0].id);

    if( seriesID.length>1){
      this.equiposOpciones= this.equipos;
    }else{
      for(let i=0; i < this.equipos.length; i++){
        if( this.equipos[i].serie == seriesID[0].id){
            this.equiposOpciones.push(new Equipo(Number(this.equipos[i].id),this.equipos[i].nombre,this.equipos[i].telefono, this.equipos[i].direccion, this.equipos[i].serie)); 
        
        }
      }
    }
   }
   
    
 }
}
