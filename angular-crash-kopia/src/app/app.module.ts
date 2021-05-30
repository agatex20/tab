import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginDataComponent } from './components/login-data/login-data.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import {AppRoutingModule} from './app-routing-module';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginDataComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
