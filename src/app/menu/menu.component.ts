import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../perfil/perfil.component';
import { UserService } from '../services/user.service';
import { PoliticaUsoComponent } from '../politica-uso/politica-uso.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  usuarioActual: any;
  hidden = true;
  mensaje: string = "";
  mensajesNuevo: number = 0;
  load= false;
  constructor(private userService: UserService,  private tokenStorageService: TokenStorageService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.usuarioActual = this.tokenStorageService.obtenerUsuario();
    this.contarMensajeNuevos();
   
  console.log(this.usuarioActual.rolusuario, "rol:")
  }
  cerrarsesion() {
    this.tokenStorageService.cerrarsesion();
    window.location.reload();
    window.location.pathname='login';

    
  }
   
  abrirInformacionUsuario(){
    const dialogRef = this.dialog.open(PerfilComponent, {
      width: '650px',
    });
    
  }
  contarMensajeNuevos() {
   if (this.usuarioActual) {
    this.userService.contarMensajesNuevos(this.usuarioActual.id).subscribe(
      dat => {
        let total = JSON.parse(dat);
       
        this.mensajesNuevo = total[0].total;
        if(this.mensajesNuevo >= 1){
          this.hidden= false;
        }
        console.log(this.mensajesNuevo);
             
      },
      err => {
        this.mensaje = err.error.message;
        
      });
   }
  }
  abrirDialogo(){
 
    const dialogRef = this.dialog.open(PoliticaUsoComponent, {
      width: '550px',
      
    });
  }
}
