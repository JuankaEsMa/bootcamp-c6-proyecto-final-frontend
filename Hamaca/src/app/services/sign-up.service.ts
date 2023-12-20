import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const url:string = 'https://proyecto-final-backend-production-c6e8.up.railway.app/';
const jsonOptions = {headers: new HttpHeaders({'skipInterceptor': 'true', 'Content-Type':'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  http = inject(HttpClient);

  signUp(nombre:any, email:any, password:any):Observable<any> {
    const dni = this.generateDNI(11111111,99999999); //Solución temporal
    return this.http.post(`${url}usuario`,{nombre, email, password, dni}, jsonOptions).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  generateDNI(min:number, max:number):number {
    return Math.floor((Math.random() * (max - min) + min));
  }
}
