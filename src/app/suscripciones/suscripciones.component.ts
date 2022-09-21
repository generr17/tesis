import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VideoService } from '../services/video.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Transaction } from '../metodo-de-pago/metodo-de-pago.component';
import { MatDialog } from '@angular/material/dialog';
import { suscripcion } from '../modelos/suscripcion.model';
import { PagoSuscripcionComponent } from '../pago-suscripcion/pago-suscripcion.component';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  pago: boolean;
}

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.scss']
})
export class SuscripcionesComponent implements OnInit {


  suscripciones: suscripcion[]=[]; 
  usuarioActual: any;
  mensaje: string;
  pago= false;
 
  fechaI = new Date();
  transactions: Transaction[]=[];
 esFallido: boolean;

  tipo= 2;
  constructor(private videoService: VideoService, private token: TokenStorageService, private usuarioService: UserService,public dialog: MatDialog, private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<SuscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ;
 
  ngOnInit(): void {
    this.usuarioActual= this.token.obtenerUsuario();
    this.cargarSuscripciones();
  }

  cargarSuscripciones (){
    this.videoService.obtenerSuscripciones().subscribe(
      (data) => {
       let suscripDat = JSON.parse(data);
     
      for(let index=0; index<suscripDat.length; index++){
      
          this.suscripciones.push({
            id: suscripDat[index].id,
            nombre: suscripDat[index].nombre,
            descripcion: suscripDat[index].descripcion,
            nota: suscripDat[index].nota,
            precio: suscripDat[index].precio
          })
      }
    
      },
      err => {
        this.mensaje = err.error.message;
      }
    );
  
  }

  abrirDialogoPago(suscripcion: any){
    console.log(suscripcion)
   
    const dialogRef = this.dialog.open(PagoSuscripcionComponent, {
      width: '300px',
      disableClose: true,
      hasBackdrop: true,
      data: {suscripcion: suscripcion, pago: this.pago},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado', result);
      this.pago = result;
      if (result){
       this.data.pago= true;
         console.log(this.pago);
      }
      
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
