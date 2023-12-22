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
}
