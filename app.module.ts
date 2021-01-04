/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { NbDatepickerModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule } from '@ngui/map';
import { CoreModule } from './@core/core.module';
import { AccountGeofenceService } from './@core/service/account-geofence.service';
import { AccountService } from './@core/service/account.service';
import { AlertSetupService } from './@core/service/alert-setup.service';
import { ClientSetupService } from './@core/service/client-setup.service';
import { DriverService } from './@core/service/driver.service';
import { FleetService } from './@core/service/fleet.service';
import { LiveUsersService } from './@core/service/live-users.service';
import { NotificationsService } from './@core/service/notifications.service';
import { UserService } from './@core/service/user.service';
import { UtilityService } from './@core/service/utility.service';
import { VehicleTripService } from './@core/service/vehicle-trip.service';
import { VehicleService } from './@core/service/vehicle.service';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';
import { RoleProvider } from './role.provider';
import { TokenInterceptor } from './token.interceptor';
import { SupportRequestService } from './@core/service/support-request.service';
import { UserProfileService } from './@core/service/user-profile.service';
import { AssetEventsService } from './@core/service/asset-events.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PaymentService } from './@core/service/payment.service';
import { PaymentHistoryService } from './@core/service/payment-history.service';
import { DeviceConfigurationService } from './@core/service/device-configuration.service';
import { SensorsService } from './@core/service/sensors.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { TripShareService } from './@core/service/trip-share.service';
import { RecurringTripService } from './@core/service/recurring-trip.service';
import { AssetMaintenanceService } from './@core/service/asset-maintenance-service';
import { CameraService } from './@core/service/camera.service';
import { NumberPlateService } from './@core/service/number-plate.service';
import { MetricsService } from './@core/service/metrics.service';

import { MatButtonModule } from '@angular/material';
import { SpeedDialFabComponent } from './@theme/components/speed-dial-fab/speed-dial-fab.component';
import { RfidRouteService } from './@core/service/rfid-route.service';
import { RfidPassengerService } from './@core/service/rfid-passenger.service';
import { RfidRouteLogService } from './@core/service/rfid-route-log.service';
import { RfidGuardianService } from './@core/service/rfid-guardian.service';
import { AlertService } from './@core/service/alert.service';
import { DeviceInventoryService } from './@core/service/device-inventory.service';
import { NotificationPrefService } from './@core/service/notification-pref.service';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { ItspisRouteService } from './@core/service/itspis-route.service';
import { BusScheduleService } from './@core/service/bus-schedule.service';
import { SimInventoryService } from './@core/service/sim-inventory.service';
import { FileUploadService } from './@core/service/file-upload.service';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [AppComponent, SpeedDialFabComponent],
  imports: [
    BrowserModule,
    NgxEchartsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbDatepickerModule.forRoot(),
    GoogleChartsModule.forRoot(),
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing&key=AIzaSyB8urzejIF3Zn3J4Ez9BDCJPGMjV8xZ3MA' }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,

            key: 'access_token', // this parameter tells where to look for the token
          },
          baseEndpoint: '',
          login: {
            // ...
            endpoint: '/auth/login',
            method: 'post',
          },
          logout: {
            // ...
            endpoint: '/logout',
            method: 'get',
          },
          register: {
            // ...
            endpoint: '/api/auth/register',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        register: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        requestPassword: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        resetPassword: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['slider'],
        },
        ROLE_BASIC: {
          view: ['user', 'route-analytics', 'support', 'support-email', 'logout'],
        },
        ROLE_DRIVER: {
          view: ['user', 'support', 'support-email', 'drivers', 'driver-trip', 'logout'],
        },
        ROLE_TECHNICIAN: {
          view: ['user', 'route-analytics', 'support', 'support-email', 'asset-run-stats', 'device-installations', 'inventory-device', 'unregistered-assets', 'device-configuration', 'ignition', 'fuel', 'logout'],
        },
        ROLE_USER: {
          view: ['user', 'device-alerts', 'dashboard', 'payment', 'fleet-view', 'fleet-utilization', 'route-analytics', 'trips-completed', 'support', 'support-email', 'subscription-renewal', 'logout'],
        },
        ROLE_RFID: {
          view: ['rfid-attendance', 'support', 'support-email', 'logout'],
          create: ['rfid-attendance', 'support', 'support-email', 'logout'],
          remove: ['rfid-attendance', 'support', 'support-email', 'logout'],
        },
        ROLE_GUARDIAN: {
          view: ['rfid-guardian-dashboard', 'support', 'support-email', 'logout'],
          create: ['rfid-guardian-dashboard', 'support', 'support-email', 'logout'],
          remove: ['rfid-guardian-dashboard', 'support', 'support-email', 'logout'],
        },
        ROLE_ITSPIS: {
          view: ['itspis-route', 'support', 'support-email', 'logout'],
          create: ['itspis-route', 'support', 'support-email', 'logout'],
          remove: ['itspis-route', 'support', 'support-email', 'logout'],
        },
        ROLE_SURVEILLANCE: {
          view: ['surveillance', 'support', 'support-email', 'logout'],
          create: ['surveillance', 'support', 'support-email', 'logout'],
          remove: ['surveillance', 'support', 'support-email', 'logout'],
        },
        ROLE_ACCOUNT: {
          parent: 'ROLE_USER',
          view: ['device-alerts', 'configure', 'alerts-setup', 'drivers', 'drivers-manage', 'trips-open', 'geofence', 'payment-history', 'ignition', 'fuel', 'maintenance'],
          create: ['configure', 'alerts-setup', 'drivers', 'trips-open', 'geofence', 'payment-history'],
          remove: ['configure', 'alerts-setup', 'drivers', 'trips-open', 'geofence', 'payment-history'],
        },
        ROLE_SUPPORT: {
          view: ['user', 'route-analytics', 'support', 'support-email', 'asset-run-stats', 'active-assets', 'subscription-report', 'payment-history', 'device-installations', 'inventory-device', 'inventory-sim', 'unregistered-assets', 'device-configuration', 'ignition', 'fuel', 'logout'],
        },
        ROLE_ADMIN: {
          view: '*',
          create: '*',
          edit: '*',
          remove: '*',
        },
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    FleetService, VehicleService, UserService, VehicleTripService, NotificationsService, DriverService, UtilityService,
    AccountService, ClientSetupService, AlertSetupService, LiveUsersService, AccountGeofenceService, SupportRequestService,
    UserProfileService, AssetEventsService, PaymentService, PaymentHistoryService, RoleProvider, DeviceConfigurationService,
    SensorsService, TripShareService, RecurringTripService, AssetMaintenanceService, CameraService, NumberPlateService, MetricsService,
    RfidRouteService, RfidPassengerService, RfidRouteLogService, RfidGuardianService, AlertService, DeviceInventoryService, NotificationPrefService,
    ItspisRouteService, BusScheduleService, SimInventoryService, FileUploadService,
    { provide: NbRoleProvider, useClass: RoleProvider },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
})
export class AppModule {
}
