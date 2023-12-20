import { CanActivateFn } from '@angular/router';

export const clientGuard: CanActivateFn = (route, state) => {
  console.log("No tienes permisos de acceso!");
  return true;
};
