import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: "full" },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
