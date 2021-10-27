import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FacadeLoggedInService } from '../service/facade-logged-in.service';
import { LoggedInSharedService } from '../service/logged-in-shared.service';

@Component({
  selector: 'app-view-tweets',
  templateUrl: './view-tweets.component.html',
  styleUrls: ['./view-tweets.component.css']
})
export class ViewTweetsComponent implements OnInit {

  private ngUnSubscribe = new Subject();

  @Input()
  tweetData: any = [];
  @Input()
  module = '';

  @Input()
  userId: number = -1;
  @Input()
  userLoginId: String = '';

  private likePostSubscription: Subscription | undefined;

  constructor(
    private facadeLoggedInService: FacadeLoggedInService,
    private loggedInSharedService: LoggedInSharedService
  ) { }

  ngOnInit(): void {
    this.tweetData = [];
    if (this.module === 'myTweet') {
      this.facadeLoggedInService.userTweetObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe((serviceData) => {
        if (Object.keys(serviceData).length > 0) {
          this.tweetData = this.loggedInSharedService.sortTweets(serviceData.serviceResponse.usertweets);
        }
      });
    } else {
      this.facadeLoggedInService.getAllTweets(this.userId);
      this.facadeLoggedInService.getTweetObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe((serviceData) => {
        if (Object.keys(serviceData).length > 0) {
          this.tweetData = this.loggedInSharedService.sortTweets(serviceData.serviceResponse.tweets);
        }
      });
    }
  }

  onTweetLike(tweet: any, tweetIndex: number, isReply: boolean, replyIndex: number): void {
    if (tweet.isLiked === true) {
      return;
    }
    this.facadeLoggedInService.likePost(this.userId, tweet.id);
    let liked = false;
    if (this.likePostSubscription === undefined) {
      this.likePostSubscription = this.facadeLoggedInService.likePostObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe((serviceData) => {
        if (Object.keys(serviceData).length > 0) {
          if (serviceData.serviceResponse.status === true) {
            if (isReply === false) {
              this.tweetData[tweetIndex].isLiked = true;
              if (liked === false) {
                this.tweetData[tweetIndex].noOfLikes++;
              }
            } else {
              this.tweetData[tweetIndex].replyTweet[replyIndex].isLiked = true;
              if (liked === false) {
                this.tweetData[tweetIndex].replyTweet[replyIndex].noOfLikes++;
              }
            }
            this.likePostSubscription?.unsubscribe();
            this.likePostSubscription = undefined;
          }
        }
      });
    }
  }

  onReply(tweet: any, event: any): void {
    let replyTweet = (<HTMLInputElement>document.getElementById(event)).value;
    const requestObject = {
      loginid: this.userLoginId,
      userid: this.userId,
      tweet: replyTweet,
      hashtag: '',
      postdate: new Date(),
      isreply: true,
      replytweetid: (tweet.replyTweetId !== undefined) ? tweet.replyTweetId : tweet.id,
      replyto: tweet.loginId
    };
    this.facadeLoggedInService.postTweet(requestObject);
    this.facadeLoggedInService.postTweetObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe((serviceData) => {
      if (Object.keys(serviceData).length > 0) {
        if (this.module === 'myTweet') {
          this.tweetData = [];
          this.facadeLoggedInService.getUserTweet(this.userLoginId);
        } else {
          this.tweetData = [];
          this.facadeLoggedInService.getAllTweets(this.userId);
        }
      }
    });
  }

}
