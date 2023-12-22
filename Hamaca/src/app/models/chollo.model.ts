import { Localidad } from "./localidad.model";

export class Chollo {
    id?:number;
    titulo?:string;
    imagen?:string;
    precioPersona?:number;
    cantidadPersonas?:number;
    descripcion?:string;
    fechaCaducidad?:Date;
    deleted?:boolean;
    localidad?:Localidad;
    tematicas?:any;
}
