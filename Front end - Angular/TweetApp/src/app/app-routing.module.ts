import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInUserModule } from './logged-in-user/logged-in-user.module';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginDashboardComponent},
  { path: 'user', loadChildren: './logged-in-user/logged-in-user.module#LoggedInUserModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
