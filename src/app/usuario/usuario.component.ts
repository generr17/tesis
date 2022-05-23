import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import { PerfilComponent } from '../perfil/perfil.component';
import { EquipoService } from '../services/equipo.service';
import { Equipo } from '../modelos/equipo.model';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  contenido= '';
 
  equipos: Equipo[]=[];
  mensaje= '';
  constructor(private userService: UserService, private tokenStorageService: TokenStorageService, public dialog: MatDialog, private equipoService: EquipoService) { }
  cerrarsesion() {
    this.tokenStorageService.cerrarsesion();
    window.location.reload();
    window.location.pathname='login';
  }
   
  abrirInformacionUsuario(){
    const dialogRef = this.dialog.open(PerfilComponent);
    
  }

  ngOnInit(): void {
   /* this.userService.obtenerContenidoUsuario().subscribe(
      data => {
        this.contenido = data;
      },
      err => {
        this.contenido = JSON.parse(err.error).message;
      }
    );*/

    this.obtenerListaEquipo();
  }
  obtenerListaEquipo(){
    this.equipoService.obtenerEquipos().subscribe(
      (data) => {
       let equipoDat = JSON.parse(data);
       for (let i=0; i < equipoDat.length; i++){
         
         this.equipos.push(new Equipo(Number(equipoDat[i].id),equipoDat[i].nombre,equipoDat[i].telefono, equipoDat[i].direccion, equipoDat[i].serieId)); 
         console.log(equipoDat[i].serieId);
        }
      },
      err => {
        this.mensaje = err.error.message;
      }
    );
  }

}
