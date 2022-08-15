import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private token: TokenStorageService, private userService: UserService) { }
  nuevoMensaje :string ="";
  usuarioActual: any= {};
  mensaje: string = "";
  chatsRooms: any[] = [];
  chatRoomId: number ;
  mensajes: any[] = [];
  nombreUsuario: string="";
  ngOnInit(): void {
    this.usuarioActual= this.token.obtenerUsuario();
    this.obtenerChatsRooms();
  }

  obtenerChatsRooms() {
    this.chatsRooms = [];
    this.userService.obtenerChatRooms(this.usuarioActual.id).subscribe(
      (data) => {
        let chats = JSON.parse(data);
        
       for(let index=0; index<chats.length; index++){
        let usuario : string = "";
        if(chats[index].nombreusuarioU != this.usuarioActual.nombreusuario && chats[index].apellidoUsuarioU != this.usuarioActual.apellidousuario){
          usuario = chats[index].nombreusuarioU + " " + chats[index].apellidoUsuarioU;
        }else{
          usuario = chats[index].nombreusuarioD + " " + chats[index].apellidousuarioD;
        }
        this.chatsRooms.push({id: chats[index].id, usuario: usuario, emisor: chats[index].emisor, texto: chats[index].mensaje, estado:chats[index].estado});  
       }

       },
       err => {
         this.mensaje = err.error.message;
       }
    );

  }

  cargarMensajes(id: number, usuario:string){
    this.nombreUsuario = usuario;
    this.chatRoomId = id;
    this.mensajes = [];
    this.userService.obtenerMensajes(id).subscribe(
      (data) => {
        let msg = JSON.parse(data);
        
       for(let index=0; index<msg.length; index++){
        this.mensajes.push({id: msg[index].id, usuarioId: msg[index].usuarioId, mensaje:msg[index].texto, fecha: msg[index].createdAt});
       }
        this.actualizarEstadoMensaje();
       },
       err => {
         this.mensaje = err.error.message;
       }
    );

  }
  enviarMensaje(){
    console.log(this.nuevoMensaje);
    this.userService.enviar(this.usuarioActual.id, this.chatRoomId, this.nuevoMensaje).subscribe(
      data => {
       console.log(data);
       this.cargarMensajes(this.chatRoomId, this.nombreUsuario);
      },
      err => {
        this.mensaje = err.error.message;
       console.log(this.mensaje);
      }
    );
    
    }
   

    actualizarEstadoMensaje(){
      this.userService.aditarEstadoMensaje(this.usuarioActual.id, this.chatRoomId).subscribe(
        (data) => {
          let msg = data;
          console.log(msg);
          this.obtenerChatsRooms();
        
         },
         err => {
           this.mensaje = err.error.message;
           console.log(this.mensaje);
         }
      )
    }


    scrollTheLastElementbyClassName(){
      let elements= document.getElementsByClassName('mensaje');
      let ultimoElemento: any = elements[elements.length - 1];
      let toppos = ultimoElemento;
      //@ts-ignore
      document.getElementById('contenedorMensajes')?.scrollTop = toppos;
    }

   
}


/*


SELECT m.emisorId FROM mensajes m JOIN usuarios u 
on m.receptorId = u.id
and u.id= 1
GROUP by m.receptorId

*/