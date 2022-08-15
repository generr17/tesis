import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../perfil/perfil.component';
import { EquipoService } from '../services/equipo.service';
import { Equipo } from '../modelos/equipo.model';
import { VideoService } from '../services/video.service';
import { Serie } from '../modelos/serie.model';
import { FileUploader } from 'ng2-file-upload';
import { MetodoDePagoComponent, Transaction } from '../metodo-de-pago/metodo-de-pago.component';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  requiredFileType:string;

  vi='';
  cargando= false;
   pago=false;  
   transactions: Transaction[]=[];
   tipo=1;
  constructor(private userService: UserService, private videoService: VideoService,private tokenStorageService: TokenStorageService, public dialog: MatDialog, private equipoService: EquipoService, private _snackBar: MatSnackBar) { }
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
              this.equiposSA.push(new Equipo(Number(equipoDat[i].id),equipoDat[i].nombre,equipoDat[i].telefono, equipoDat[i].direccion, equipoDat[i].serieId, Number(equipoDat[i].precio)));
             } else if( equipoDat[i].serieId == 2){
              this.equiposSB.push(new Equipo(Number(equipoDat[i].id),equipoDat[i].nombre,equipoDat[i].telefono, equipoDat[i].direccion, equipoDat[i].serieId, Number(equipoDat[i].precio))); 
             }
             this.equipos.push(new Equipo(Number(equipoDat[i].id),equipoDat[i].nombre,equipoDat[i].telefono, equipoDat[i].direccion, equipoDat[i].serieId, Number(equipoDat[i].precio))); 
             
          }
        },
        err => {
          this.mensaje = err.error.message;
          this.openSnackBar(this.mensaje);
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
        this.openSnackBar(this.mensaje);
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
                this.transactions[i] = {item: this.form.equipoId[i].nombre, cost: this.form.equipoId[i].precio,tipo: this.tipo};
          }
         }else{
           for(let i=0; i < this.equiposSB.length; i++){
           
             this.seleccionados.push(Number(this.equiposSB[i].id)); 
             this.transactions[i] = {item: this.equiposSB[i].nombre, cost: this.equiposSB[i].precio, tipo: this.tipo};

        
           }
         }
        
        this.videoService.guardarVideo(videoUrl,image, this.tokenStorageService.obtenerUsuario().id,this.seleccionados).subscribe(
          data => {
            console.log(data);
            this.esExitoso = true;
            this.esRegistroFallido = false;
            this.openSnackBar("Video subido exitosamente");
          },
          err => {
            this.mensaje = err.error.message;
            this.esRegistroFallido = true;
            this.openSnackBar(this.mensaje);
          }
        )
        }
      }
  
 }

 abrirDialogoPago(){
  var equipos;
  console.log(this.equiposSB);
  if (this.form.equipoId.length == 0) {
    //var equip= this.form.equipoId;
    equipos= this.equiposSB;
   
   
   }else{
    equipos= this.form.equipoId;
   }
   console.log(equipos)
  const dialogRef = this.dialog.open(MetodoDePagoComponent, {
    width: '300px',
    data: {equipos: equipos, pago: this.pago, tipo: this.tipo},
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialogo cerrado');
    this.pago = result;
  });
 }


 openSnackBar(mensaje: string) {
    
  this._snackBar.open(mensaje,"" ,{
    duration: 5*1000,
    horizontalPosition: "end",
    verticalPosition: "top",
    panelClass: ['warning']
   });

}


}