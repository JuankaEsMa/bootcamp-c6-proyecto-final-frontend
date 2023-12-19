import { HttpInterceptorFn, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiLoggingInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({headers: req.headers.set('Authorization', 'my-auth-token')});
    console.log("ENTRA AL INTERCEPTOR")
    return next.handle(authReq);
  }
};
