import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FacadeLoggedInService } from '../service/facade-logged-in.service';
import { LoggedInSharedService } from '../service/logged-in-shared.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject();

  userAction = 0;
  userLoginId: String;
  userName: String;
  userId: number;

  newTweet: string;
  hashTag: string;
  tweetData: any = [];

  postTweetSub: Subscription | undefined;

  constructor(
    private router: Router,
    private loggedInSharedService: LoggedInSharedService,
    private facadeLoggedInService: FacadeLoggedInService) {
    if (loggedInSharedService.getUserId() === -1) {
      this.router.navigateByUrl('/login');
    }
    this.newTweet = '';
    this.hashTag = '';
    this.userLoginId = loggedInSharedService.getUserLoginId();
    this.userName = loggedInSharedService.getUserName();
    this.userId = loggedInSharedService.getUserId();
  }

  ngOnInit(): void {
    this.onNavigationClick(1);
  }

  onNavigationClick(selectedOption: number): void {
    this.userAction = selectedOption;
    switch (selectedOption) {
      case 1:
        this.newTweet = '';
        this.facadeLoggedInService.getUserTweet(this.userLoginId);
        break;
      case 2:
        break;
      case 3:
        this.facadeLoggedInService.getUsersList();
        break;
      case 5:
        this.loggedInSharedService.deleteLoggedInUser();
        this.router.navigateByUrl('/login');
        break;
      default:
        break;
    }
  }

  postTweet(): void {
    const requestObject = {
      loginid: this.userLoginId,
      userid: this.userId,
      tweet: this.newTweet,
      hashtag: this.hashTag,
      postdate: new Date()
    };
    this.facadeLoggedInService.postTweet(requestObject);
    if (this.postTweetSub === undefined) {
      this.postTweetSub = this.facadeLoggedInService.postTweetObservable.pipe(takeUntil(this.ngUnsubscribe)).subscribe((serviceData) => {
        if (Object.keys(serviceData).length > 0) {
          this.newTweet = '';
          this.hashTag = '';
          this.facadeLoggedInService.getUserTweet(this.userLoginId);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.facadeLoggedInService.removeBehaviorSubject();
    if(this.postTweetSub) {
      this.postTweetSub.unsubscribe();
    }
  }

}
