import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  
  constructor(private router: Router, private authServicio: AuthService, private _snackBar: MatSnackBar) { }
 valorSeleccionado:string = '';

  ngOnInit(): void {
  }

  registrar():void {
    console.log(this.form.genero);
    
    this.authServicio.registar(this.form).subscribe(
      data => {
        console.log(data);
        this.esExitoso = true;
        this.esRegistroFallido = false;
        this.openSnackBar("Usuario registrado exitosamente");
      },
      err => {
        this.mensaje = err.error.message;
        this.esRegistroFallido = true;
        this.openSnackBar(this.mensaje + ". Intente mas tarde");
      }
    );
    //this.router.navigate(['login']);
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
}
