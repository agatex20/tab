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
import { ContextComponent } from './modules/main-page/components/context/context/context.component';
import {AuthGuard} from "./authentication/auth.guard";
import { MainComponent } from './modules/user-leaves/components/main/main.component';
import { LeavesListComponent } from './modules/user-leaves/components/leaves-list/leaves-list.component';
import { LeaveFormComponent } from './modules/user-leaves/components/leave-form/leave-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginDataComponent,
    MainPageComponent,
    NavigationBarComponent,
    ContextComponent,
    MainComponent,
    LeavesListComponent,
    LeaveFormComponent,
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
