import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../services/equipo.service';
import { Serie } from '../modelos/serie.model';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})

export class EquipoComponent implements OnInit {
  form: any= {};
  tokenS: any;
  load=false;
  clases: string[]=[];
  esExitoso = false;
  esRegistroFalliso = false;
  mensaje: '';
  series: Serie[] = [];
  constructor(private equipoService: EquipoService, private token:TokenStorageService) { }
  ngOnInit(): void {
    this.tokenS = this.token.obtenerToken();
    if(this.tokenS){
      this.obtenerListaSeries();
    }else{
      this.load =true;
    }
  
  }

  guardarEquipo(): void {
    let idSerie = this.series.find( serie => serie.nombre === this.form.serieId);
    console.log(idSerie.id);
    this.equipoService.crearEquipo(this.form, idSerie.id).subscribe(
      data => {
        console.log(data);
        this.esExitoso =true;
        this.esRegistroFalliso= false;
      },
      err=> {
        this.mensaje = err.error.message;
        this.esRegistroFalliso = true;
      }
    );
  }

  obtenerListaSeries(){
     this.equipoService.obtenerSeries().subscribe(
       (data) => {
        let seriesA = JSON.parse(data);
        for (let i=0; i < seriesA.length; i++){
          this.clases.push(seriesA[i].nombre);
          this.series.push(new Serie(Number(seriesA[i].id),seriesA[i].nombre )); 
        }
        this.load = true;
       },
       err => {
         this.mensaje = err.error.message;
       }
     );
  }

}
