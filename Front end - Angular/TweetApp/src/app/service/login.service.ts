import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceGlobal } from '../globals/service-global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  serviceGlobal = this.environmentGlobal.getServiceList();

  constructor(
    private environmentGlobal: ServiceGlobal,
    private http: HttpClient) { }

  callLoginService(requestObject: any): Observable<any> {
    const serviceUrl = this.serviceGlobal.USER_LOGIN;
    return this.http.post<any>(serviceUrl, requestObject);
  }

  callUserRegisterService(requestObject: any): Observable<any> {
    const serviceUrl = this.serviceGlobal.USER_REGISTER;
    return this.http.post<any>(serviceUrl, requestObject);
  }

  changePassword(requestObject: any): Observable<any> {
    const serviceUrl = this.serviceGlobal.USER_FORGOT_PASSWORD;
    return this.http.post<any>(serviceUrl, requestObject);
  }

}
