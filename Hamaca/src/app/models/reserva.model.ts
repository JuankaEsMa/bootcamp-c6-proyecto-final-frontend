import { Chollo } from "./chollo.model";
import { User } from "./user.model";

export class Reserva {
    id?:number;
    fechaCompra?:Date;
    numNoches?:number;
    numPersonas?:number;
    nota?:number;
    chollo?:Chollo;
    cliente?:User;
}
