import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDataComponent } from './modules/login/components/login-page/login-data.component';
import { MainPageComponent } from "./modules/main-page/components/main-page/main-page.component";
import { AddWorkerComponent } from './modules/add-worker/components/add-worker/add-worker.component';
import { AuthGuard } from "./authentication/auth.guard";
import { LeaveRequestsComponent } from './modules/leave-requests/components/leave-requests/leave-requests.component';


const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'login', component: LoginDataComponent,},
  {path: 'add-worker', component: AddWorkerComponent,},
  {path: 'leave-requests', component: LeaveRequestsComponent,},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
