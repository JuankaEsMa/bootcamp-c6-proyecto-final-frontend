import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private httpClient:HttpClient) { }

  getAllPaises():Observable<any>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/pais");
  }
}
