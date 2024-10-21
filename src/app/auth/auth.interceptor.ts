import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
console.log('req in interceptor', req);

  return next(req);
};
