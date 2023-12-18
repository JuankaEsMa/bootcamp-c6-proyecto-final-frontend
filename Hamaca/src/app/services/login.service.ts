import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const url:string = 'https://proyecto-final-backend-production-c6e8.up.railway.app/chollo';
const jsonOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  login(username:any, password:any):Observable<any>{
    return this.http.post(`${url}/login`,{username,password}, jsonOptions);
  }

  register(username:any, email:any, password:any):Observable<any>{
    return this.http.post(`${url}/login`,{username,password}, jsonOptions);
  }
}
