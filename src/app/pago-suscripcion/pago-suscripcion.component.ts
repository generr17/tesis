
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { suscripcion } from '../modelos/suscripcion.model';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../services/token-storage.service';

declare var paypal: any;
@Component({
  selector: 'app-pago-suscripcion',
  templateUrl: './pago-suscripcion.component.html',
  styleUrls: ['./pago-suscripcion.component.scss']
})
export class PagoSuscripcionComponent implements OnInit {

  usuarioActual: any;
  mensaje: string;
  esFallido: boolean;
  constructor(private usuarioService: UserService, private token: TokenStorageService, private _snackBar: MatSnackBar , public dialogRef: MatDialogRef<PagoSuscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
      this.usuarioActual= this.token.obtenerUsuario();
     }
    producto ={
      descripcion: "Subir video para equipos",
      precio: 0,
    }
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  ngOnInit(): void {
    console.log(this.data);
      this.producto.descripcion = this.data.suscripcion.nombre;
      this.producto.precio = this.data.suscripcion.precio;
    paypal
    .Buttons({
      createOrder: (data:any, actions:any) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.descripcion,
              amount: {
                currency_code: 'USD',
                value        : this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async (data:any, actions:any) => {
        const order = await actions.order.capture();
        console.log("orden: ", order.status);
        if(order.status){
          this.data.pago= true;
           if(this.data.pago){
              this.guardarSuscripcion(this.usuarioActual.id, this.data.suscripcion.id, this.data.suscripcion.nombre);
           }
        }
      },
      onError: (err:any) => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);

  }

  guardarSuscripcion(usuarioId:number, suscripcionId: number, suscripcionTipo: string){
    this.usuarioService.guardarSuscripcionUsuario(usuarioId, suscripcionId, suscripcionTipo).subscribe(
      dat => {
        console.log(dat);
        this.esFallido = false;
        this.openSnackBar(dat.message);
        this.actualizarEstadoSuscripcion();
      },
      err => {
        this.mensaje = err.error.message;
        this.esFallido = true;
        this.openSnackBar(this.mensaje);
      }
    );
  }

  actualizarEstadoSuscripcion(){
    this.usuarioService.aditarSuscripcion(this.usuarioActual.id, 1).subscribe(
      dat => {
        console.log(dat);
        this.esFallido = false;
        this.openSnackBar(dat.message);

      },
      err => {
        this.mensaje = err.error.message;
        this.esFallido = true;
        this.openSnackBar(this.mensaje);
      }
    )
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


 interface DialogData {
  suscripcion: suscripcion;
  pago: boolean;
    
}
 
