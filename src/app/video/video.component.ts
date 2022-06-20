import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../modelos/usuario.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public nombre : string
  public url: string;
  public usr: number;
  public usuario: Usuario;
  user: any;
  mensaje: string;
  constructor(private videoService: VideoService, private activateRoute: ActivatedRoute, private usuarioService: UserService) { }

  ngOnInit(): void {
    this.nombre = this.activateRoute.snapshot.paramMap.get("video");
    console.log(this.nombre);
    this.usr = Number(this.activateRoute.snapshot.paramMap.get("usuario"));
  // this.CargarDatos(this.usr);
   this.url = "http://localhost:3000/api/video/reproducir/"+ this.nombre;
   this.cargarUser();
    console.log(this.usuario);
   

  }
  
  
  CargarDatos(id:number){
   console.log(id);
    
    this.usuarioService.obtenerUsuarioPorId(id).subscribe(
      data => {
       let dat = JSON.parse(data);
      this.user= JSON.parse(data);
       this.usuario =  new Usuario(dat.nombreusuario, dat.apellidousuario, dat.telefono, dat.fechanacimiento, dat.direccion, dat.genero, dat.email);
      
      },
      err => {
        this.mensaje = err.error.message;
       
      }
    );
    console.log(this.nombre);
   
    
  }
 
  cargarUser(){
    this.usuarioService.obtenerUPorId(this.usr).subscribe(
      dat => {
        this.usuario = new Usuario(dat.nombreusuario, dat.apellidousuario, dat.telefono, dat.fechanacimiento, dat.direccion, dat.genero, dat.email);
       console.log(this.usuario)
      },
      err => {
        this.mensaje = err.error.message;
        
      })
  }
}
