import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginDataComponent } from './components/login-data/login-data.component';
import {MainPageComponent} from './components/main-page/main-page.component';


const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: '', component: LoginDataComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}