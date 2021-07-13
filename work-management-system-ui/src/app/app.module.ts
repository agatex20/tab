import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ButtonComponent} from './utils/components/button/button.component';
import {LoginDataComponent} from './modules/login/components/login-page/login-data.component';
import {AppRoutingModule} from './app-routing-module';
import { NavigationBarComponent } from './modules/navbar/components/navigation-bar/navigation-bar.component';
import {MainPageComponent} from "./modules/main-page/components/main-page/main-page.component";
import { ContextComponent } from './modules/main-page/components/context/context.component';
import {AuthGuard} from "./authentication/auth.guard";
import { AddWorkerComponent } from './modules/add-worker/components/add-worker/add-worker.component';
import { HelpComponent } from './modules/help/components/help/help.component';
import { LeaveRequestsComponent } from './modules/leave-requests/components/leave-requests/leave-requests.component';
import { LeavesComponent } from './modules/leaves/components/leaves/leaves.component';
import { ReportComponent } from './modules/report/components/report/report.component';
import { RolesComponent } from './modules/roles/components/roles/roles.component';
import { SchemeComponent } from './modules/scheme/components/scheme/scheme.component';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
