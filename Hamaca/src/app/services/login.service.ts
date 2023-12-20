import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const url:string = 'https://proyecto-final-backend-production-c6e8.up.railway.app';
const jsonOptions = {headers: new HttpHeaders({'skipInterceptor': 'true', 'Content-Type':'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  login(username:any, password:any):Observable<any> {
        return this.http.post(`${url}/login`,{username,password}, jsonOptions).pipe(
          catchError(error => {
            console.error(error);
            throw error;
          })
        );
  }

  register(username:any, email:any, password:any):Observable<any> {
    return this.http.post(`${url}/login`,{username,password}, jsonOptions);
  }
}
