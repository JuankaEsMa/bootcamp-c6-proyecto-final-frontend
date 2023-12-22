import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from "../models/reserva.model";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private httpClient:HttpClient) { }

  showReserva(id:string):Observable<any>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/reserva/"+id);
  }
  listReservas():Observable<any>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/reserva");
  }
  setNota(note:number, idReserva:number){
    return this.httpClient.put("https://proyecto-final-backend-production-c6e8.up.railway.app/reserva/"+idReserva+"/setNota?nota="+note,{})
  }
  addReserva(idChollo:number, fechaInicio:string, fechaFin:string, numPersonas:string){
    return this.httpClient.post("https://proyecto-final-backend-production-c6e8.up.railway.app/reserva?idChollo="
    +idChollo+"&fechaInicio="+fechaInicio+"&fechaFin="+fechaFin+"&numPersonas="+numPersonas,{})
  }
}
