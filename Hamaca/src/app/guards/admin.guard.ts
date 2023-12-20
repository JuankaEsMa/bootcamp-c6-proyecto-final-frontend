import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  alert("No eres administrador de la pagina!");
  return false;
};
