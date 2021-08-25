import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ButtonComponent } from './utils/components/button/button.component';
import { LoginDataComponent } from './modules/login/components/login-page/login-data.component';
import { AppRoutingModule } from './app-routing-module';
import { NavigationBarComponent } from './modules/navbar/components/navigation-bar/navigation-bar.component';
import { MainPageComponent } from "./modules/main-page/components/main-page/main-page.component";
import { ContextComponent } from './modules/main-page/components/context/context.component';
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



@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginDataComponent,
    MainPageComponent,
    NavigationBarComponent,
    ContextComponent,
    AddWorkerComponent,
    HelpComponent,
    LeaveRequestsComponent,
    LeavesComponent,
    ReportComponent,
    RolesComponent,
    SchemeComponent,
    AlertComponent,
    AddRequestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,


  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
