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
  tokenS: any;
  public nombre : string
  public url: string;
  public usr: number;
  public usuario: any={};
  public idVideo: number;
  habilidades: string[] =[];
  cargando =  false;
  mostrar=false;
  user: any;
  mensajeE: string;
  nuevoMensaje :string ="";
  usuarioActual: any= {};
  mensaje: string = "";
  mensajes: any = [
  ];
  constructor(private videoService: VideoService, private activateRoute: ActivatedRoute, private usuarioService: UserService, private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.tokenS= this.token.obtenerToken();
    if(this.tokenS){
      this.usuarioActual = this.token.obtenerUsuario();
      this.nombre = this.activateRoute.snapshot.paramMap.get("video");
      this.idVideo = Number(this.activateRoute.snapshot.paramMap.get("idVideo"));
      console.log(this.idVideo);
      this.usr = Number(this.activateRoute.snapshot.paramMap.get("usuario"));
    }else{
      this.cargando = true;
    }
    
  // this.CargarDatos(this.usr);
  
   this.cargarUser();
    console.log(this.usr);
   

  }
  
  cargarHabilidades(){
    this.userService.obtenerHabilidadesPorUsuario(this.usr).subscribe(
      data => {
       let dat = JSON.parse(data);
       for( let i = 0; i< dat.length; i++){
            this.habilidades.push(dat[i].nombre);
            
       }
       console.log(dat);
      },
      err => {
        this.mensajeE = err.error.message;
       
      })
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
        this.cargarHabilidades();
        this.editarEstadoVideo();
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
   

    editarEstadoVideo(){
      this.videoService.aditarEstadoVideo(this.idVideo, this.usuarioActual.equipoId).subscribe(
        dat => {
         console.log(dat);
               
        },
        err => {
          this.mensaje = err.error.message;
          
        })
    }

   scrollTheLastElementbyClassName(){
      let elements= document.getElementsByClassName('mensaje');
      let ultimoElemento: any = elements[elements.length ];
      let toppos = ultimoElemento;
      //@ts-ignore
      document.getElementById('contenedorMensajes')?.scrollTop = toppos;
    }
}
