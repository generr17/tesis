import { Component, OnInit,} from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PagoSuscripcionComponent } from '../pago-suscripcion/pago-suscripcion.component';
import { suscripcion } from '../modelos/suscripcion.model';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData {
  suscripcion: suscripcion;
  pago: boolean;
}
@Component({
  selector: 'app-bloqueo',
  templateUrl: './bloqueo.component.html',
  styleUrls: ['./bloqueo.component.scss']
})
export class BloqueoComponent implements OnInit {
 
  producto = {
    descripcion: 'Activar cuenta',
    precio: 5.00
  }
  load = false;
  usuarioActual : any = {};
  pago = false;
  mensaje: string;
  constructor(private token: TokenStorageService, private usuarioService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar ) { }
 
  ngOnInit(): void {
  
   this.obtenerUsuarioActual();
  

  }
  
 obtenerUsuarioActual(){
    this.usuarioService.obtenerUsuarioPorId(this.token.obtenerUsuario().id).subscribe(
      dat => {
        console.log(dat);
        this.usuarioActual = JSON.parse(dat);
        this.load = true;
      },
      err => {
        this.mensaje = err.error.message;
        this.load = false;
      }
    )
 }
 openDialog(): void {
  const dialogRef = this.dialog.open(PagoSuscripcionComponent, {
    width: '300px',
    disableClose: true,
      hasBackdrop: true,
    data: {suscripcion: {id:0, nombre: 'Activar cuenta', precio: 5.00}, pago: this.pago},
  });

  dialogRef.afterClosed().subscribe(result => {
    this.pago = result;
    console.log(this.pago)
    if(this.pago){
        this.actualizarEstadoUsuario(this.usuarioActual.id);
    }
  });
}

actualizarEstadoUsuario(usuarioId:number){
  this.usuarioService.editarEstado(usuarioId).subscribe(
    dat => {
      console.log(dat);
      this.openSnackBar(dat.message);
      window.location.pathname='login';
      
      
    },
    err => {
      this.mensaje = err.error.message;
      this.openSnackBar(this.mensaje);
    }
  );
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
