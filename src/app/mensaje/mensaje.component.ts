import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {

  constructor(private usuarioService: UserService, private tokenStorage: TokenStorageService) { }
  usuarioActual: any = {};
  mensaje: string = "";
  chatsRooms: any[] = [];
  mensajes: any[] = [];
  ngOnInit(): void {
    this.usuarioActual= this.tokenStorage.obtenerUsuario();
    this.obtenerChatsRooms();
  }

  obtenerChatsRooms() {
    this.usuarioService.obtenerChatRooms(this.usuarioActual.id).subscribe(
      (data) => {
        let chats = JSON.parse(data);
        
       for(let index=0; index<chats.length; index++){
        this.chatsRooms.push({id: chats[index].id, usuarioUno: chats[index].usuarioU, usuarioDos: chats[index].usuarioD});
         
       }
       },
       err => {
         this.mensaje = err.error.message;
       }
    );

  }

  cargarMensajes(id: number){
    this.usuarioService.obtenerMensajes(id).subscribe(
      (data) => {
        let msg = JSON.parse(data);
        
       for(let index=0; index<msg.length; index++){
        this.mensajes.push({id: msg[index].id, usuarioId: msg[index].usuarioId, mensaje:msg[index].texto, fecha: msg[index].createdAt});
       }
       },
       err => {
         this.mensaje = err.error.message;
       }
    );

  }

}
