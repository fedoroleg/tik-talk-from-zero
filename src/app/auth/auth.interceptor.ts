import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


let isRefreshing = false

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const accessToken = authService.accessToken
  const refreshToken = authService.refreshToken
  const cookieService = inject(CookieService)

  console.log('authInterceptor runs, REQ = ', req.url);
  console.log('accessToken in interceptor = ', accessToken);
  console.log('refreshToken in interceptor = ', refreshToken);
  console.log(`refreshToken in cookies = `, cookieService.get('refreshToken'));
  
  
  
  if (!accessToken) return next(req)

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }

  req = req.clone({
    setHeaders: {
      authorization: `Bearer ${accessToken}`
    }
  })

  return next(addToken(req, accessToken))
    .pipe(
      catchError(error => {
        if(error.status === 403) {
          return refreshAndProceed(authService, req, next)
        }
        return throwError(error )
      })
    )
};

const refreshAndProceed = (authService: AuthService, req: HttpRequest<any>, next: HttpHandlerFn) => {
  console.log('refreshAndProceed run');
  
  if (!isRefreshing) {
    isRefreshing = true
    return authService.refreshAuthToken()
      .pipe(
        switchMap(res => {
          return next(addToken(req, res.access_token)).pipe(
            tap(() => isRefreshing = false)
          )
        })
      )

  }
  return next(addToken(req, authService.accessToken!))
}

const addToken = (req: HttpRequest<any>, accessToken: string) => {
  return req.clone({
    setHeaders: {
      authorization: `Bearer ${accessToken}`
    }
  })
}