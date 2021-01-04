import { Component } from '@angular/core';
import { UserSignup } from '../../@core/data/user-signup';
import { UserProfileService } from '../../@core/service/user-profile.service';

@Component({
  selector: 'unigps-user-signup',
  styleUrls: ['./user-signup.component.scss'],
  templateUrl: './user-signup.component.html',
})
export class UserSignupComponent {

  user: UserSignup;
  error; success;
  loading = false;
  constructor(private userProfileService: UserProfileService) {
    this.user = new UserSignup();
  }

  onSubmit() {
    this.loading = true;
    this.userProfileService.userSignupRequest(this.user).subscribe((result) => {
      this.success = "Thanks for signing up.  We will contact you shortly";
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = error.error.message;
      setTimeout(() => {
        this.error = null;
      }, 3000);
    });
  }
}
