import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chollo } from '../models/chollo.model';

@Injectable({
  providedIn: 'root'
})
export class CholloService {

  constructor(private httpClient:HttpClient) { }
  getAllChollos():Observable<Chollo>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/chollo");
  }
  getCholloById(id:string):Observable<Chollo>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/chollo/"+id)
  }
  getAllChollosFiltered(filters:Array<string>):Observable<any>{
    let url:string =  "https://proyecto-final-backend-production-c6e8.up.railway.app/chollo";

    for (let i = 0; i < filters.length; i++) {
      filters[i];
    }

    return this.httpClient.get("");
  }
}
