import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../services/equipo.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})

export class EquipoComponent implements OnInit {
  form: any= {};
  clases: string[]=[];
  esExitoso = false;
  esRegistroFalliso = false;
  mensaje: '';
  series: Serie[] = [];
  constructor(private equipoService: EquipoService) { }
  ngOnInit(): void {
   this.obtenerListaSeries();
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
       },
       err => {
         this.mensaje = err.error.message;
       }
     );
  }

}
class Serie {
  id: number;
  nombre: string;
  constructor(idSerie:number, nombreSerie:string){
    this.id = idSerie,
    this.nombre= nombreSerie
  };
}