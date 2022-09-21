import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

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
  totalHabilidades: number;
  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, private _snackBar: MatSnackBar, private usuarioService: UserService) { }
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
        if(this.rol == "usuario"){
           if(this.tokenStorage.obtenerUsuario().activo){
            this.openSnackBar(msg);
            this.contarHabilidades();

           }else{
            this.tokenStorage.cerrarsesion();
            window.location.pathname='login';
           }
        }
        this.openSnackBar(msg);
        this.contarHabilidades();
       
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
     this.contarHabilidades();
  
  }

  contarHabilidades(){
    this.usuarioService.contarHabilidades(this.tokenStorage.obtenerUsuario().id).subscribe(
      (data) => {
       let res = JSON.parse(data);
       this.totalHabilidades= res[0].total
       this.reloadPage();
      },
      err => {
        this.mensaje = err.error.message;
        this.openSnackBar(this.mensaje);
      }
    );
  }
  reloadPage(){
    //window.location.reload();

    if (this.rol === 'usuario'){
    
      console.log("total: ",this.totalHabilidades);
     if(this.totalHabilidades === 0){
        window.location.pathname='habilidades';
      }else{
        window.location.pathname='usuario';
      }
      

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
