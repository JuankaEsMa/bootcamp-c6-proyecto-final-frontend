import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tematica } from '../models/tematica.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TematicaService {

  constructor(private httpClient:HttpClient) { }

  getAllTematicas():Observable<any>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/tematica");
  }
}
