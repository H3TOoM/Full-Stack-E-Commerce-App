import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth/AuthService.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/']);

    Swal.fire({
      title: 'Please Login First',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false,
    });

    return false;
  }
};
