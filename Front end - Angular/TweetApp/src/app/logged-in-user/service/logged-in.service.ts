import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceGlobal } from 'src/app/globals/service-global';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  serviceGlobal = this.environmentGlobal.getServiceList();

  constructor(
    private environmentGlobal: ServiceGlobal,
    private http: HttpClient
  ) { }

  public getUsersList(): Observable<any> {
    const serviceUrl = this.serviceGlobal.VIEW_ALL_USERS;
    return this.http.get<any>(serviceUrl);
  }

  public postTweet(requestObject: any): Observable<any> {
    const serviceUrl = this.serviceGlobal.POST_TWEET + requestObject.loginid + '/add';
    return this.http.post<any>(serviceUrl, requestObject);
  }

  public getUserTweet(loginid: String): Observable<any> {
    const serviceUrl = this.serviceGlobal.GET_USER_TWEET + loginid;
    return this.http.get<any>(serviceUrl);
  }

  public getAllTweets(userid: number): Observable<any> {
    const serviceUrl = this.serviceGlobal.VIEW_ALL_TWEET + userid;
    return this.http.get<any>(serviceUrl);
  }

  public likePost(userid: number, tweetid: number): Observable<any> {
    const serviceUrl = this.serviceGlobal.LIKE_TWEET + userid + '/like/' + tweetid;
    return this.http.get<any>(serviceUrl);
  }

}
