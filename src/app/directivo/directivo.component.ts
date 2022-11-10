import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../services/equipo.service';
import { AuthService } from '../services/auth.service';
import { Equipo } from '../modelos/equipo.model';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-directivo',
  templateUrl: './directivo.component.html',
  styleUrls: ['./directivo.component.scss']
})
export class DirectivoComponent implements OnInit {
  tokenS: any;
  form: any= {};
  equiposNombre: string[]=[];
  equipos: Equipo[]=[];
  mensaje= '';
  esExitoso=false;
  esRegistroFallido=false;
  load= false;
  constructor(private equipoService:EquipoService, private authService: AuthService,private token: TokenStorageService) { }
   
  ngOnInit(): void {
    this.tokenS = this.token.obtenerToken();
    if(this.tokenS){
      this.obtenerListaEquipo();
    }else{
      this.load = true;
    }
   
  }
  obtenerListaEquipo(){
    this.equipoService.obtenerEquipos().subscribe(
      (data) => {
       let equipo = JSON.parse(data);
       for (let i=0; i < equipo.length; i++){
         this.equiposNombre.push(equipo[i].nombre);
         this.equipos.push(new Equipo(Number(equipo[i].id),equipo[i].nombre,equipo[i].telefono, equipo[i].direccion, equipo[i].serie, Number(equipo[i].precio))); 
       }
       this.load = true;
      },
      err => {
        this.mensaje = err.error.message;
      }
    );
  }

  guardarUsuario():void {
    let equipoId = this.equipos.find( equipo => equipo.nombre === this.form.equipoId);
    console.log(equipoId.id);
    this.authService.registrarDirectivo(this.form, equipoId.id).subscribe(
      data => {
        console.log(data);
        this.esExitoso =true;
        this.esRegistroFallido= false;
      },
      err=> {
        this.mensaje = err.error.message;
        this.esRegistroFallido = true;
      }
    );
  }

}




