import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  estaLogeado = false;
  loginFallido = false;
  mensaje = '';
  rol: string = '';
  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    if (this.tokenStorage.obtenerToken()) {
      this.estaLogeado = true;
      this.rol = this.tokenStorage.obtenerUsuario().rolusuario;
      
    }
  }
 
  irARegistrar(): void {
    this.router.navigate(['registro']);
  }
  
  iniciarSesion(): void {
    this.authService.iniciarsesion(this.form).subscribe(
      data => {
        this.tokenStorage.guardarToken(data.accessToken);
        this.tokenStorage.guardarUsuario(data);
        this.loginFallido = false;
        this.estaLogeado = true;
        this.rol = this.tokenStorage.obtenerUsuario().rolusuario;
        let msg="Logeado como: " + this.rol;
        this.openSnackBar(msg);
       this.reloadPage();
        //console.log("rol: " + this.rol);
        
      },
      err => {
        this.mensaje = err.error.message;
        this.loginFallido = true;
        this.openSnackBar("Login fallido:" + this.mensaje);
      }
    );
    
    
    //this.router.navigate(['usuario']);
  }

  openSnackBar(mensaje: string) {
    
    this._snackBar.open(mensaje,"" ,{
      duration: 5*1000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['warning']
     });
  
  }

  reloadPage(){
    //window.location.reload();
    if (this.rol === 'usuario'){
      window.location.pathname='usuario';
    } else if (this.rol === 'admin') {
      window.location.pathname= 'administrador';
    }else if (this.rol === "directivo"){
      window.location.pathname='videos';
    }
  }
   
  irAPagina() {
    if (this.rol === 'admin'){
      this.router.navigate(['administrador']);
    }else if (this.rol === 'directivo'){
      this.router.navigate(['directivo']);
    }else if (this.rol === 'usuario'){
      this.router.navigate(['usuario']);
    }
  }
  
}
