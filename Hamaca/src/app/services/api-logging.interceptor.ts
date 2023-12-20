import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service'

const tokenStorageService = new TokenStorageService();

export const ApiLoggingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get('skipInterceptor') === 'true') {
    return next(req);
  }

  const token = tokenStorageService.getToken();
  const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)})
  return next(authReq);
}
