   export class Equipo {
    id: number;
    nombre: string;
    telefono: string;
    direccion: string;
    serie: number;
    precio: number;
   
    constructor(id: number, nombre: string, telefono:string, direccion:string, serie:number, precio: number){
        this.id=id;
        this.nombre=nombre;
        this.telefono=telefono;
        this.direccion=direccion;
        this.serie=serie;
        this.precio=precio;
    }
}