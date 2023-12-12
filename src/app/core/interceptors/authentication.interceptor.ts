import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

//This interceptor adds the access token stored in sessionstorage to the requestheader 
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private router:Router){ }

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem('access_token');

    // Clone the request and attach the bearer token if available
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return handler.handle(request);
  }
}
