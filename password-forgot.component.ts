import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../@core/service/user-profile.service';

@Component({
  selector: 'unigps-password-forgot',
  templateUrl: 'password-forgot.component.html',
  styles:[
    `
    .ng-valid[required], .ng-valid.required  {
      border-left: 5px solid #42A948; /* green */
    }
    
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }
    
    `
  ]
})

export class PasswordForgotComponent {
  contactEmail;
  submitted = false;
  success; error;
  loading = false;

  constructor(private userProfileService: UserProfileService, public router: Router) {

  }

  onSubmit(): void {
    this.loading = true;
    this.submitted = true;
    this.userProfileService.forgotPwdRequest(this.contactEmail).subscribe(() => {
      this.submitted = false;
      this.loading = false;
      this.contactEmail = null;
      this.success = "Reset Password has been sent to your registered email adress.\nPlease check your Inbox and click on Reset Password Link.";
    }, (error) => {
      this.submitted = false;
      this.loading = false;
      // this.error  = error.error.message;
      this.error = "Password could NOT be reset. Please try again";
      setInterval(() => {
        this.error = null;
      }, 5000);
    });
  }
}
