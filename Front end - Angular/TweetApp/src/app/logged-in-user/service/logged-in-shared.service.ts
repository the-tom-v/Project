import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoggedInSharedService {

  private _userId: number;
  private _userLoginId: String;
  private _userName: String;

  constructor() {
    this._userId = -1;
    this._userLoginId = '';
    this._userName = '';
  }

  public getUserId(): number {
    return this._userId;
  }
  public setUserId(value: number) {
    this._userId = value;
  }

  public getUserName(): String {
    return this._userName;
  }
  public setUserName(value: String) {
    this._userName = value;
  }

  public getUserLoginId(): String {
    return this._userLoginId;
  }
  public setUserLoginId(value: String) {
    this._userLoginId = value;
  }

  public sortTweets(tweets: any): any {

    tweets.forEach((tweet: any) => {
      tweet.postTime = new Date(tweet.postTime);
      let replyTweets = tweet.replyTweet;
      replyTweets.forEach((replyTweet: any) => {
        replyTweet.postTime = new Date(replyTweet.postTime);
      });
    });
    tweets = _.orderBy(tweets, ['postTime'], ['desc']);

    return tweets;
  }

  public deleteLoggedInUser() {
    this.setUserId(-1);
    this.setUserLoginId('');
    this.setUserName('');
  }

}
