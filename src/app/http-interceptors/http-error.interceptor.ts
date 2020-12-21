import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service'; 
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpErrorIntercept implements HttpInterceptor{
   
    constructor(private spinnerService: SpinnerService ){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        console.log('Error intercept provider');

        this.spinnerService.requestStarted();

        return this.handler(next, request);
    
    
    }
   
    
    handler(next, request){
        return next.handle(request)
            .pipe(
                tap(
                    (event) => {
                        if( event instanceof HttpResponse){
                            this.spinnerService.requestEnded();
                        }
                    },
                    (error: HttpErrorResponse) => {
                        this.spinnerService.resetSpinner ();
                        throw error;
                    }
                ),
            );
    }
    
}