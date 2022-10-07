import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'tesis-prueba-app';
  private roles: number[]= [];
  estaLogeado = false;
  mostrarVentanaAdministrador = false;
  mostrarVentanaDirectivo = false;
  mostrarVentanaUsuario = false;
  nombreusuario : string;
  estado = 0;
  constructor(private tokenStorageService:TokenStorageService){}
  ngOnInit(): void {
    this.estaLogeado = !!this.tokenStorageService.obtenerToken();
    if (this.estaLogeado) {
      const usuario = this.tokenStorageService.obtenerUsuario();
      this.estado = usuario.activo;
      console.log("usuario logeado: " , usuario);
      this.roles = usuario.roleId;
      if(usuario.roleId === 1){
        this.mostrarVentanaAdministrador = true;
      }else if(usuario.roleId === 2) {
        this.mostrarVentanaDirectivo = true;
      }else if(usuario.roleId === 3){
        this.mostrarVentanaUsuario = true;
      }
      this.nombreusuario = usuario.nombreusuario;
      console.log(this.estaLogeado);
    }
  }
  cerrarsesion() {
    this.tokenStorageService.cerrarsesion();
    window.location.reload();
  }
  
}
