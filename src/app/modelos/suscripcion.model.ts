export class suscripcion {
    id: number;
    nombre: string;
      descripcion:string;
      nota: string;
      precio: number;
    constructor(id: number, nombre: string, descripcion: string, nota: string, precio: number){
        this.id=id;
        this.nombre=nombre;
        this.descripcion = descripcion;
        this.nota = nota;
        this.precio = precio;
       
    }
}