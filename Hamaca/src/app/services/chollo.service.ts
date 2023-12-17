import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chollo } from '../models/chollo.model';
import { Filters } from '../models/filters.model';

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
  getAllChollosFiltered(filters:Filters):Observable<any>{
    let url:string =  "https://proyecto-final-backend-production-c6e8.up.railway.app/chollo?localidad="
    +filters.localidad+"&tematica="+filters.tematica+"&pais="+filters.pais+"&dataInicio="+filters.dataInicio+"&dataFinal="
    +filters.dataFinal+"&precioMin="+filters.precioMin+"&precioMax="+filters.precioMax+"&page="+filters.page+"&size="+filters.size;
    return this.httpClient.get(url);
  }
  deleteCholloById(id:string){
    return this.httpClient.delete("https://proyecto-final-backend-production-c6e8.up.railway.app/chollo/"+id)
  }
  addChollo(chollo:Chollo){
    return this.httpClient.post("https://proyecto-final-backend-production-c6e8.up.railway.app/chollo/", chollo);
  }
  addTematicaInChollo(id:string, idTematica:string){
    return this.httpClient.post("https://proyecto-final-backend-production-c6e8.up.railway.app/chollo/"+id, {id:idTematica});
  }
}
