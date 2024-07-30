import { ApiService } from '../../core/service/api-service.service';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authUrl = '/auth'

  constructor(private apiService: ApiService) {}

  register(user: User): Observable<any> {
    return this.apiService.post<any>(this.fetchAuthEndpoint(`/register`), user).pipe(
      map(response => {
        if (response.status === 1) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      }),
      catchError(error => {
        const customError = {
          status: error.status,
          message: error.error.message || error.message || 'An unexpected error occurred'
        };
        return throwError(() => customError);
      })
    );
  }

  login(user: User): Observable<any> {
    return this.apiService.post<{ token: string }>(this.fetchAuthEndpoint(`/login`), user).pipe(
      map(response => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      }),
      catchError(error => {
        const customError = {
          status: error.status,
          message: error.error.message || error.message || 'An unexpected error occurred'
        };
        return throwError(() => customError);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return token != null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  clearToken(): void {
    sessionStorage.removeItem('token');
  }

  signOut(): void {
    this.clearToken();
  }
  fetchAuthEndpoint(endpointPostfix:string)
  {
    return `${this.authUrl}${endpointPostfix}`
  }

}
