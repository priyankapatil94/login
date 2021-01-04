/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UserSignupComponent } from './user-signup/user-signup.component';


export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'pwd-forgot',
        component: PasswordForgotComponent,
      },
      {
        path: 'pwd-reset',
        component: PasswordResetComponent,
      },
      {
        path: 'sign-up',
        component: UserSignupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}