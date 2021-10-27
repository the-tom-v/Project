import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggedInSharedService } from '../logged-in-user/service/logged-in-shared.service';
import { FacadeDashboardService } from '../service/facade-dashboard.service';

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})
export class LoginDashboardComponent implements OnInit, OnDestroy {

  loginOptions = [
    { label: 'Login', value: 0 },
    { label: 'Sign Up', value: 1 }
  ];
  selectedOptions = 0;
  dialogBox = {
    visibility: false,
    title: '',
    message: ''
  };

  loginForm: FormGroup;
  signUpForm: FormGroup;
  forgotPasswordForm: FormGroup;

  password = '';
  confirmPassword = '';

  sgnupPassSub: Subscription = new Subscription();
  sgnupCnfrmPassSub: Subscription = new Subscription();

  private ngUnSubscribe = new Subject();

  sgninSrvceSub: Subscription | undefined;
  sgnUpSrvceSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private facadeDashboardService: FacadeDashboardService,
    private router: Router,
    private loggedInSharedService: LoggedInSharedService) {

    this.loginForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      loginId: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
    });
    this.forgotPasswordForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectedOptions = 0;
    // tslint:disable-next-line: deprecation
    this.sgnupPassSub = this.signUpForm.controls.password.valueChanges.subscribe((data: string) => {
      if (data) {
        if (data.length < 8) {
          this.signUpForm.controls.password.setErrors({ 'minlength': true });
          return;
        } else {
          this.signUpForm.controls.password.setErrors(null);
        }
        this.password = data;
        this.checkPassword();
      }
    });
    // tslint:disable-next-line: deprecation
    this.sgnupCnfrmPassSub = this.signUpForm.controls.confirmPassword.valueChanges.subscribe((data: string) => {
      if (data) {
        this.confirmPassword = data;
        this.checkPassword();
      }
    });
  }

  onSignIn(): void {
    const requestObject = {
      loginid: this.loginForm.controls.loginId.value,
      password: this.loginForm.controls.password.value
    };
    this.facadeDashboardService.callLoginService(requestObject);
    if (this.sgninSrvceSub === undefined) {
      this.sgninSrvceSub = this.facadeDashboardService.loginObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe(serviceData => {
        if (Object.keys(serviceData).length > 0) {
          if (serviceData.serviceResponse.status === true) {
            let data = serviceData.serviceResponse.userDetails;
            this.loggedInSharedService.setUserId(data.id);
            this.loggedInSharedService.setUserName(data.firstName + ' ' + data.lastName);
            this.loggedInSharedService.setUserLoginId(data.loginid);
            this.router.navigateByUrl('/user');
          } else if (serviceData.serviceResponse.status === false && serviceData.serviceResponse.errors === undefined) {
            this.showPopUp('Invalid Credential.', 'Error');
          } else if (serviceData.serviceResponse.errors !== undefined) {
            this.showPopUp('Some error occured please try again later. ' + serviceData.serviceResponse.errors, 'Error');
          }
        }
      });
    }
  }

  onSignUp(): void {
    const requestObject = {
      loginid: this.signUpForm.controls.loginId.value,
      password: this.signUpForm.controls.password.value,
      firstname: this.signUpForm.controls.firstName.value,
      lastname: this.signUpForm.controls.lastName.value,
      contactnumber: this.signUpForm.controls.phoneNumber.value,
      email: this.signUpForm.controls.email.value
    };
    this.facadeDashboardService.callUserRegisterService(requestObject);
    if (this.sgnUpSrvceSub === undefined) {
      this.sgnUpSrvceSub = this.facadeDashboardService.registerUserObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe(serviceData => {
        if (Object.keys(serviceData).length > 0) {
          if (serviceData.serviceResponse.status === true) {
            this.showPopUp('User registered successfully.', 'Success');
            this.selectedOptions = 0;
            this.resetForm();
          } else if (serviceData.serviceResponse.status === false && serviceData.serviceResponse.errors === undefined) {
            this.showPopUp('Login id or Email is already used by another user.', 'Error');
          } else if (serviceData.serviceResponse.errors !== undefined) {
            this.showPopUp('Something went wrong. ' + serviceData.serviceResponse.errors, 'Error');
          }
        }
      });
    }
  }

  onChangePassword(): void {
    const requestObject = {
      loginid: this.forgotPasswordForm.controls.loginId.value,
      password: this.forgotPasswordForm.controls.password.value
    };
    this.facadeDashboardService.changePassword(requestObject);
    this.facadeDashboardService.changePasswordObservable.pipe(takeUntil(this.ngUnSubscribe)).subscribe((serviceData) => {
      if (Object.keys(serviceData).length > 0) {
        if (serviceData.serviceResponse.status === true) {
          this.showPopUp('Password changed successfully.', 'Success');
          this.selectedOptions = 0;
        } else {
          this.showPopUp('Something went wrong.', 'Error');
        }
      }
    });
  }

  onForgotPasswordClick(): void {
    this.selectedOptions = 2;
    this.resetForm();
  }

  resetForm(): void {
    this.loginForm.reset();
    this.signUpForm.reset();
    this.forgotPasswordForm.reset();
    this.password = '';
    this.confirmPassword = '';
  }

  checkPassword(): void {
    if (this.password === '' || this.confirmPassword === '' || this.password === this.confirmPassword) {
      this.signUpForm.controls.password.setErrors(null);
      return;
    } else {
      this.signUpForm.controls.password.setErrors({ passwordmismatch: true });
      return;
    }
  }

  showPopUp(message: string, title: string): void {
    this.dialogBox.visibility = true;
    this.dialogBox.title = title;
    this.dialogBox.message = message;
    setTimeout(() => {
      this.dialogBox.visibility = false;
      this.dialogBox.title = '';
      this.dialogBox.message = '';
    }, 6000);
  }

  checkForgotPass(): void {
    let password = this.forgotPasswordForm.controls.password.value;
    let confirmPass = this.forgotPasswordForm.controls.confirmPassword.value;
    if (password !== '' && password !== null && password.length < 8) {
      this.forgotPasswordForm.controls.password.setErrors({ minlength: true });
      return;
    }
    if (password === '' || password === null || confirmPass === '' || confirmPass === null) {
      return;
    } else if (password !== confirmPass) {
      this.forgotPasswordForm.controls.password.setErrors({ passwordmismatch: true });
    } else {
      this.forgotPasswordForm.controls.password.setErrors(null);
    }
  }

  ngOnDestroy(): void {
    if (this.sgnupCnfrmPassSub) {
      this.sgnupCnfrmPassSub.unsubscribe();
    }
    if (this.sgnupPassSub) {
      this.sgnupPassSub.unsubscribe();
    }
    if (this.sgnUpSrvceSub) {
      this.sgnUpSrvceSub.unsubscribe();
    }
    if (this.sgninSrvceSub) {
      this.sgninSrvceSub.unsubscribe();
    }
    this.facadeDashboardService.resetBehaviorSubject();
  }

}
