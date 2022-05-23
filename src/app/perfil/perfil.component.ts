import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuarioActual: any;
  //tokenA:any;
  form: any = {};
  esExitoso = false;
  esEditadoFallido = false;
  mensaje = '';
  

  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.usuarioActual = this.token.obtenerUsuario();
   // this.tokenA= this.token.obtenerToken();
    this.cargarDatos();
   
  }

  cargarDatos() {
    this.form.nombreusuario = this.usuarioActual.nombreusuario;
    this.form.apellidousuario = this.usuarioActual.apellidousuario;
    this.form.direccion = this.usuarioActual.direccion;
    this.form.telefono = this.usuarioActual.telefono;
    this.form.email = this.usuarioActual.email,
    this.form.genero = this.usuarioActual.genero,
    this.form.fechanacimiento = this.usuarioActual.fechanacimiento
    this.form.clave= '';
  }

  editar(): void {
   
  
    this.userService.editarUsuario(this.usuarioActual.id, this.form).subscribe( 
      dat => {
      console.log(dat);
      this.esExitoso = true;
      this.esEditadoFallido = false;
    },
    err => {
      this.mensaje = err.error.message;
      this.esEditadoFallido = true;
    }
  )
  }

}
