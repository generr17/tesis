
export class Usuario {
  
    nombre: string;
    apellido: string;
    telefono: string;
    fechanacimiento: Date;
    direccion: string;
    genero: string;
    correo: string;
    suscrito: number; 
    constructor( nombre:string, apellido: string, telefono:string, fechanacimiento:Date, direccion:string, genero: string, correo:string, suscrito: number){
      
      this.nombre= nombre,
      this.apellido= apellido,
      this.telefono = telefono,
      this.fechanacimiento= fechanacimiento,
      this.direccion= direccion,
      this.genero = genero,
      this.correo = correo,
      this.suscrito = suscrito
};
}