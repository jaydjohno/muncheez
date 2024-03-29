import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WordpressService } from '../../services/wordpress.service';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor 
{
    constructor(private api: WordpressService) { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.api.getUserValue();
        
        if (currentUser && currentUser.token) 
		{
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
 
        return next.handle(request);
    }
}