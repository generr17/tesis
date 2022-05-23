   export class Equipo {
    id: number;
    nombre: string;
    telefono: string;
    direccion: string;
    serie: number;
    
   
    constructor(id: number, nombre: string, telefono:string, direccion:string, serie:number){
        this.id=id;
        this.nombre=nombre;
        this.telefono=telefono;
        this.direccion=direccion;
        this.serie=serie;
    }
}