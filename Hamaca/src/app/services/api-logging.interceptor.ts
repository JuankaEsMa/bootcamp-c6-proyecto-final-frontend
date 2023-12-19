import { HttpInterceptorFn, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiLoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    console.log(req);
    console.log("Hola");

    return next.handle(authReq);
  }
};
