/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbLogoutComponent } from '@nebular/auth';
import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbAuthService, NbTokenService } from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent extends NbLogoutComponent implements OnInit {
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    protected tokenService: NbTokenService
  ) {
    super(service, options, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  logout(strategy: string): void {
    super.logout(strategy);
    this.tokenService.clear();
    console.log('logging out');
    this.router.navigateByUrl('/auth/login');
  }
}