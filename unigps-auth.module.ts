/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbCardModule, NbSpinnerModule } from '@nebular/theme';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { UserProfileService } from '../@core/service/user-profile.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UserSignupComponent } from './user-signup/user-signup.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbAuthModule, NbInputModule, NbCheckboxModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
    UserSignupComponent
  ],
  providers: [UserProfileService]
})
export class AuthModule {
}