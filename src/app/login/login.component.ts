import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

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
  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }
  
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
       
       this.reloadPage();
        //console.log("rol: " + this.rol);
        
      },
      err => {
        this.mensaje = err.error.message;
        this.loginFallido = true;
      }
    );
    
    //this.router.navigate(['usuario']);
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
  

  ngOnInit(): void {
    if (this.tokenStorage.obtenerToken()) {
      this.estaLogeado = true;
      this.rol = this.tokenStorage.obtenerUsuario().rolusuario;    
      
      
    }
  }
 


}
