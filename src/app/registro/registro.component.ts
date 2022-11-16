import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PoliticaUsoComponent } from '../politica-uso/politica-uso.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
 
  form: any = {};
  esExitoso = false;
  esRegistroFallido = false;
  mensaje = '';
  generos = ['Femenimo', 'Masculino', 'Otro'];
  checked = false;
  constructor(public dialog: MatDialog,private router: Router, private authServicio: AuthService, private _snackBar: MatSnackBar) { }
 valorSeleccionado:string = '';

  ngOnInit(): void {
  }
  
  registrar():void {
    console.log(this.form.genero);
    console.log();
    this.authServicio.registar(this.form).subscribe(
      data => {
        console.log(data);
        this.esExitoso = true;
        this.esRegistroFallido = false;
        this.openSnackBar(data.message);
        this.router.navigate(['login']);
      },
      err => {
        this.mensaje = err.error.message;
        this.esRegistroFallido = true;
        this.openSnackBar(this.mensaje + ". Intente mas tarde");
      }
    );
    //
  }
  irAIniciarSesion():void{
    this.router.navigate(['login']);
  }

  openSnackBar(mensaje: string) {
    
    this._snackBar.open(mensaje,"" ,{
      duration: 5*1000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['warning']
     });
  
  }

  abrirDialogo(){
 
    const dialogRef = this.dialog.open(PoliticaUsoComponent, {
      width: '550px',
      
    });
  }



}
