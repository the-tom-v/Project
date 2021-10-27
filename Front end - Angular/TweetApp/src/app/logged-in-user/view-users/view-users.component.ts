import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FacadeLoggedInService } from '../service/facade-logged-in.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  userData: any = [];

  @Input()
  currentUser: number = -1;

  userListSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private facadeLoggedInService: FacadeLoggedInService
  ) { }

  ngOnInit(): void {
    if (this.currentUser === -1) {
      this.router.navigateByUrl('/login');
    }
    if (this.userListSubscription === undefined) {
      this.userListSubscription = this.facadeLoggedInService.userListObservable.pipe(takeUntil(this.ngUnsubscribe)).subscribe((serviceData) => {
        if (Object.keys(serviceData).length > 0) {
          let data = serviceData.serviceResponse.users;
          this.userData = [];
          data.forEach((element: any) => {
            if (element.id !== this.currentUser) {
              this.userData.push(element);
            }
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }
  }

}
