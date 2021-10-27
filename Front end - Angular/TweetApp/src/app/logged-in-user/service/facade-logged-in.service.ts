import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggedInService } from './logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeLoggedInService {

  private userListBehaviorSubject = new BehaviorSubject<any>({});
  userListObservable = this.userListBehaviorSubject.asObservable();

  private postTweetBehaviorSubject = new BehaviorSubject<any>({});
  postTweetObservable = this.postTweetBehaviorSubject.asObservable();

  private userTweetBehaviorSubject = new BehaviorSubject<any>({});
  userTweetObservable = this.userTweetBehaviorSubject.asObservable();

  private getTweetBehaviorSubject = new BehaviorSubject<any>({});
  getTweetObservable = this.getTweetBehaviorSubject.asObservable();

  private likePostBehaviorSubject = new BehaviorSubject<any>({});
  likePostObservable = this.likePostBehaviorSubject.asObservable();

  constructor(
    private loggedInService: LoggedInService
  ) { }

  public getUsersList(): void {
    this.userListBehaviorSubject.next({});
    this.loggedInService.getUsersList().subscribe((data) => {
      this.userListBehaviorSubject.next(data);
    });
  }

  public postTweet(requestObject: any): void {
    this.postTweetBehaviorSubject.next({});
    this.loggedInService.postTweet(requestObject).subscribe((data) => {
      this.postTweetBehaviorSubject.next(data);
    });
  }

  public getUserTweet(loginid: String): void {
    this.userTweetBehaviorSubject.next({});
    this.loggedInService.getUserTweet(loginid).subscribe((data) => {
      this.userTweetBehaviorSubject.next(data);
    });
  }

  public getAllTweets(userid: number): void {
    this.getTweetBehaviorSubject.next({});
    this.loggedInService.getAllTweets(userid).subscribe((data) => {
      this.getTweetBehaviorSubject.next(data);
    });
  }

  public likePost(userid: number, tweetid: number): void {
    this.likePostBehaviorSubject.next({});
    this.loggedInService.likePost(userid, tweetid).subscribe((data) => {
      this.likePostBehaviorSubject.next(data);
    });
  }

  public removeBehaviorSubject(): void {
    this.userListBehaviorSubject.next({});
    this.postTweetBehaviorSubject.next({});
    this.userTweetBehaviorSubject.next({});
    this.getTweetBehaviorSubject.next({});
    this.likePostBehaviorSubject.next({});
  }

}
