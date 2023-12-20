import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';



const url:string = 'https://proyecto-final-backend-production-c6e8.up.railway.app';
const jsonOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  login(username:any, password:any):Observable<any> {
    try {
        return this.http.post(`${url}/login`,{username,password}, jsonOptions);
    } catch (error) {
        throw error;
    }
  }

  register(username:any, email:any, password:any):Observable<any>{
    return this.http.post(`${url}/login`,{username,password}, jsonOptions);
  }
}
