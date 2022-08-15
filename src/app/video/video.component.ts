import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../modelos/usuario.model';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public nombre : string
  public url: string;
  public usr: number;
  public usuario: any={};
  cargando =  false;
  mostrar=false;
  user: any;
  mensajeE: string;
  nuevoMensaje :string ="";
  usuarioActual: any= {};
  mensaje: string = "";
  mensajes: any = [
    {emisor: "id",
      texto: "Hola como estas",
      receptor: "id"
     },
     {emisor: "id",
     texto: "Hola "
    },
    {emisor: "id",
    texto: "como estas"
   }
   , {emisor: "id",
   texto: "Bien"
   }
  ];
  constructor(private videoService: VideoService, private activateRoute: ActivatedRoute, private usuarioService: UserService, private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.usuarioActual = this.token.obtenerUsuario();
    this.nombre = this.activateRoute.snapshot.paramMap.get("video");
    console.log(this.nombre);
    this.usr = Number(this.activateRoute.snapshot.paramMap.get("usuario"));
  // this.CargarDatos(this.usr);
  
   this.cargarUser();
    console.log(this.usuario);
   

  }
  
  
  CargarDatos(id:number){
   console.log(id);
    
    this.usuarioService.obtenerUsuarioPorId(id).subscribe(
      data => {
       let dat = JSON.parse(data);
      this.user= JSON.parse(data);
       this.usuario = {nombre: dat.nombreusuario, apellido: dat.apellidousuario, telefono: dat.telefono, fechanacimiento: dat.fechanacimiento, direccion: dat.direccion, genero: dat.genero, correo: dat.email, suscrito: dat.suscrito};
      
      },
      err => {
        this.mensajeE = err.error.message;
       
      }
    );
    console.log(this.nombre);
   
    
  }
 
  cargarUser(){
    this.usuarioService.obtenerUPorId(this.usr).subscribe(
      dat => {
        this.url = "http://localhost:3000/api/video/reproducir/"+ this.nombre;
        this.usuario = new Usuario(dat.nombreusuario, dat.apellidousuario, dat.telefono, dat.fechanacimiento, dat.direccion, dat.genero, dat.email,dat.suscrito);
        this.cargando= true;

      },
      err => {
        this.mensaje = err.error.message;
        
      })
  }

    enviarMensaje(){
    console.log(this.usr, "id receptor");
    this.userService.enviarMensaje(this.usuarioActual.id, this.usr, this.nuevoMensaje).subscribe(
      data => {
       console.log(data);
       this.mensajes.push(mensaje);
      },
      err => {
        this.mensaje = err.error.message;
       console.log(this.mensaje);
      }
    );
    let mensaje = {
      emisor: this.usuarioActual.id,
      texto: this.nuevoMensaje
    }
    
    this.nuevoMensaje= "";
    } 
   


   scrollTheLastElementbyClassName(){
      let elements= document.getElementsByClassName('mensaje');
      let ultimoElemento: any = elements[elements.length - 1];
      let toppos = ultimoElemento;
      //@ts-ignore
      document.getElementById('contenedorMensajes')?.scrollTop = toppos;
    }
}
