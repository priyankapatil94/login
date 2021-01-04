import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'pages', 
  canActivate: [AuthGuard],
  loadChildren: './pages/pages.module#PagesModule' },
  {
    path: 'auth',
    loadChildren: './auth/unigps-auth.module#AuthModule',
  },
  {
    path: 'track',
    loadChildren: './open/open.module#OpenModule',
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
  { path: 'pgwcallback',redirectTo:'/pgwcallback'},
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
