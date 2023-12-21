import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Chollo } from '../models/chollo.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient:HttpClient) { }
  getAllUsers():Observable<User>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/usuario");
  }
  saveCholloFavorite(cholloId:number):Observable<any>{
    return this.httpClient.post("https://proyecto-final-backend-production-c6e8.up.railway.app/cliente/addCholloFav",{id:cholloId})
  }
  removeCholloFavorite(cholloId:number):Observable<any>{
    return this.httpClient.post("https://proyecto-final-backend-production-c6e8.up.railway.app/cliente/removeCholloFav",{id:cholloId})
  }
  deleteUser(){
    return this.httpClient.delete("https://proyecto-final-backend-production-c6e8.up.railway.app/usuario");
  }
  getMyCliente():Observable<any>{
    return this.httpClient.get("https://proyecto-final-backend-production-c6e8.up.railway.app/cliente/myCliente");
  }
  updateUsuario(user:User):Observable<User>{
    return this.httpClient.put("https://proyecto-final-backend-production-c6e8.up.railway.app/usuario",user);
  }
}
