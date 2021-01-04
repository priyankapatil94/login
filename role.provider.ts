import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { observable } from 'rxjs';

@Injectable()
export class RoleProvider implements NbRoleProvider {

    roles;

    constructor(private authService: NbAuthService) {
    }

    getRole(): Observable<string[]> {
        return this.authService.onTokenChange()
            .pipe(
                map((token: NbAuthJWTToken) => {
                    let role = token.isValid() ? token.getPayload()['role'][0].authority : 'guest';
                    let roles = [];
                    if (token.isValid()) {
                        let authorities = token.getPayload()['role'];
                        for (let role of authorities) {
                            roles.push(role.authority);
                        }
                    }
                    this.roles =roles;
                    return roles;
                }),
            );
    }
}