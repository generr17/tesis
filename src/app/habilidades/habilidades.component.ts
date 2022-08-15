import { Component, OnInit } from '@angular/core';
import { Habilidad } from '../modelos/habilidad.model';
import { UserService } from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { identifierName } from '@angular/compiler';
@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent implements OnInit {

  constructor(private usuarioService: UserService, private _snackBar: MatSnackBar, fb: FormBuilder, private tokenStorageService: TokenStorageService) {
    this.form = fb.group({
      selectedHabilidades:  new FormArray([])
     });
   }
  form: FormGroup;
  habilidades: Habilidad[]= [];
  nombresHabilidades: string[] = [];
  mensaje: string;
  ngOnInit(): void {
    this.openSnackBar("Aun faltan pasos para completar la configuración de su cuenta");
    this.obtenerListaHabilidades();
  }


  obtenerListaHabilidades(){
    
    this.usuarioService.obtenerHabilidadesT().subscribe(
      (data) => {
       let habilidadesA = JSON.parse(data);
      
       for (let i=0; i < habilidadesA.length; i++){

         this.habilidades.push(new Habilidad(Number(habilidadesA[i].id),habilidadesA[i].nombre)); 
         this.nombresHabilidades.push(habilidadesA[i].nombre);
       }
      
     
      },
      err => {
        this.mensaje = err.error.message;
        this.openSnackBar(this.mensaje);
      }
    );
   
 };
 openSnackBar(mensaje: string) {
    
  this._snackBar.open(mensaje,"" ,{
    duration: 5*1000,
    horizontalPosition: "end",
    verticalPosition: "top",
    panelClass: ['warning']
   });

}
onCheckboxChange(event: any) {
    
  const  selectedHabilidades = (this.form.controls['selectedHabilidades'] as FormArray);
  if (event.target.checked) {
    selectedHabilidades.push(new FormControl(event.target.value));
  } else {
    const index =  selectedHabilidades.controls
    .findIndex(x => x.value === event.target.value);
    selectedHabilidades.removeAt(index);
  }
}

/*submit() {
  console.log(this.form.value);
}*/

submit() {
  console.log(this.form.value.selectedHabilidades[0]);
  
  //for(let i=0; i< this.form.value.selectedHabilidades.length; i++){
    this.usuarioService.guardarHabilidades(this.tokenStorageService.obtenerUsuario().id,this.form.value.selectedHabilidades).subscribe(
      data => {
        console.log(data);
        this.openSnackBar("Habilidades guardadas exitosamente");
        this.cargarPaginaSiguiente();
      },
      err => {
        this.mensaje = err.error.message;
        this.openSnackBar(this.mensaje);
      }
    )
 // }
 
}
 cargarPaginaSiguiente(){
  window.location.pathname='usuario';
 }
}
