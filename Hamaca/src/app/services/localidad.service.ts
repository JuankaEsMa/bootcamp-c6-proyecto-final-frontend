import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private httpClient:HttpClient) { }

  getAllLocalidades():Observable<any>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/localidad")
  }
}
