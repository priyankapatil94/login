import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserProfileService } from '../../@core/service/user-profile.service';

@Component({
  selector: 'unigps-password-reset',
  templateUrl: 'password-reset.component.html',
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

export class PasswordResetComponent {
  contactEmail;
  submitted = false;
  success; error;
  loading = false;

  newPassword: string;
  repeatPassword: string;
  isTokenValid: boolean;
  token: string;
  changePasswordMsg: string;
  isChangePassword: boolean;
  barLabel: string = "Password strength:";
  passwordBarColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  constructor(private userProfileService: UserProfileService, private router: Router,
    public activateRouter: ActivatedRoute) {

  }

  ngOnInit() {
    this.activateRouter.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
      console.log("token", this.token);
      this.validateToken(this.token);
    });
  }
  validateToken(token): void {
    this.userProfileService.validateToken(token).subscribe(
      (result) => {
        this.isTokenValid = true;
      }, (error => {
        console.error(error);
        this.isTokenValid = false;
      }));
  }

  resetPassword(): void {
    this.userProfileService.resetPassword(this.newPassword, this.token).subscribe(result => {
      this.isChangePassword = true;
      this.changePasswordMsg = "Password has been changed Successfully. ";
    }, error => {
      let message: string = error.error.message;
      this.isChangePassword = false;
    });
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
