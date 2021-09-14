import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//////////////////////////
import { fakeBackendProvider} from './fakebackend/fake-backend.interceptor';
/////////////////////////

import { AppComponent } from './app.component';
import { ButtonComponent } from './utils/components/button/button.component';
import { AppRoutingModule } from './app-routing-module';
import { NavigationBarComponent } from './modules/navbar/components/navigation-bar/navigation-bar.component';
import { AddWorkerComponent } from './modules/add-worker/components/add-worker/add-worker.component';
import { HelpComponent } from './modules/help/components/help/help.component';
import { LeaveRequestsComponent } from './modules/leave-requests/components/leave-requests/leave-requests.component';
import { LeavesComponent } from './modules/leaves/components/leaves/leaves.component';
import { ReportComponent } from './modules/report/components/report/report.component';
import { RolesComponent } from './modules/roles/components/roles/roles.component';
import { SchemeComponent } from './modules/scheme/components/scheme/scheme.component';
import { AlertComponent } from './alerts/components/alert/alert.component';
import { ErrorInterceptor } from './interceptors/error.interceptor'
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AddRequestComponent } from './modules/add-request/add-request.component';
import { LeavesTypesComponent } from './modules/leaves-types/leaves-types.component';
import { AddLeavesTypeComponent } from './modules/add-leaves-type/add-leaves-type.component';
import { AddRoleComponent } from './modules/add-role/add-role.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { PageNotFound } from "./utils/components/PageNotFound/page-not-found.component";
import { LoginComponent } from "./modules/login/components/login-page/login.component";



@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    NavigationBarComponent,
    AddWorkerComponent,
    HelpComponent,
    LeaveRequestsComponent,
    LeavesComponent,
    ReportComponent,
    RolesComponent,
    SchemeComponent,
    AlertComponent,
    AddRequestComponent,
    LeavesTypesComponent,
    AddLeavesTypeComponent,
    AddRoleComponent,
    ChangePasswordComponent,
    PageNotFound
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
