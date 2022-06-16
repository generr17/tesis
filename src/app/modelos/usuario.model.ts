
export class Usuario {
  
    nombre: string;
    apellido: string;
    telefono: string;
    fechanacimiento: Date;
    direccion: string;
    genero: string;
    correo: string;
    constructor( nombre:string, apellido: string, telefono:string, fechanacimiento:Date, direccion:string, genero: string, correo:string){
      
      this.nombre= nombre,
      this.apellido= apellido,
      this.telefono = telefono,
      this.fechanacimiento= fechanacimiento,
      this.direccion= direccion,
      this.genero = genero,
      this.correo = correo
};
}