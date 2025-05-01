import { authInterceptor } from './auth.interceptor';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

describe('authInterceptor', () => {
  it('should add Authorization header if token exists', (done) => {
    localStorage.setItem('token', 'test-token');

    const req = new HttpRequest('GET', '/api/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('Authorization')).toBe('Bearer test-token');
      return of({} as HttpEvent<any>);
    };

    authInterceptor(req, next).subscribe(() => done());
  });

  it('should not add header if no token', (done) => {
    localStorage.removeItem('token');

    const req = new HttpRequest('GET', '/api/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.has('Authorization')).toBeFalse();
      return of({} as HttpEvent<any>);
    };

    authInterceptor(req, next).subscribe(() => done());
  });
});
