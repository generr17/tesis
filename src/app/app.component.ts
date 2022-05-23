import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'tesis-prueba-app';
  private roles: string[];
  estaLogeado = false;
  mostrarVentanaAdministrador = false;
  mostrarVentanaDirectivo = false;
  mostrarVentanaUsuario = false;
  nombreusuario : string;
  
  constructor(private tokenStorageService:TokenStorageService){}
  ngOnInit(): void {
    this.estaLogeado = !!this.tokenStorageService.obtenerToken();
    if (this.estaLogeado) {
      const usuario = this.tokenStorageService.obtenerUsuario();
      this.roles = usuario.rolusuario;
      this.mostrarVentanaAdministrador = this.roles.includes('admin');
      this.mostrarVentanaDirectivo = this.roles.includes('directivo');
      this.mostrarVentanaUsuario = this.roles.includes('usuario');
      this.nombreusuario = usuario.nombreusuario;
      console.log(this.estaLogeado);
    }
  }
  cerrarsesion() {
    this.tokenStorageService.cerrarsesion();
    window.location.reload();
  }
  
}
