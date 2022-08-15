import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Equipo } from '../modelos/equipo.model';
declare var paypal: any;

@Component({
  selector: 'app-metodo-de-pago',
  templateUrl: './metodo-de-pago.component.html',
  styleUrls: ['./metodo-de-pago.component.scss']
})
export class MetodoDePagoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MetodoDePagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }
    displayedColumns: string[]= ['item', 'cost'];
     transactions: Transaction[];   
  producto ={
    descripcion: "Subir video para equipos",
    precio: 0,
  }
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  ngOnInit(): void {
   
     console.log("Dato: ", this.data.equipos);
   
   
      this.producto.precio= this.getTotalCost();
    
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
        }
      },
      onError: (err:any) => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);

  }
 
 getTotalCost() {
  return this.data.equipos.map(t => t.precio).reduce((acc, value) => acc + value, 0);
}
  

}
export interface DialogData {
  equipos: Equipo[];
  pago: boolean;
  tipo: Number;
}
export interface Transaction {
  item: string;
  cost: number;
  tipo: number;
}