import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptorFn: HttpInterceptorFn = (req, next) => {


if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
  

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

  return next(req);
};
