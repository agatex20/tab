import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDataComponent } from './modules/login/components/login-page/login-data.component';
import { MainPageComponent } from "./modules/main-page/components/main-page/main-page.component";
import { AuthGuard } from "./authentication/auth.guard";


const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'login', component: LoginDataComponent},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
