import { CanActivateFn } from '@angular/router';

export const userNotauthGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('token')) {
    return true;
  }
  return false;
};
