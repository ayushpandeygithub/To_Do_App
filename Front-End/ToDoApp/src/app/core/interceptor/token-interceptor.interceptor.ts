import { HttpInterceptorFn  } from '@angular/common/http';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    const token : string | null = sessionStorage.getItem('token');
    const modifiedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next(modifiedRequest);
};
