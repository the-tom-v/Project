import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SelectButtonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    InputMaskModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
