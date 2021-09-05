import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDataComponent } from './modules/login/components/login-page/login-data.component';
import { AddWorkerComponent } from './modules/add-worker/components/add-worker/add-worker.component';
import { AuthGuard } from "./authentication/auth.guard";
import { LeaveRequestsComponent } from './modules/leave-requests/components/leave-requests/leave-requests.component';
import { LeavesComponent } from './modules/leaves/components/leaves/leaves.component';
import { AddRequestComponent } from './modules/add-request/add-request.component';
import { RolesComponent } from './modules/roles/components/roles/roles.component';
import { LeavesTypesComponent } from './modules/leaves-types/leaves-types.component';
import { AddLeavesTypeComponent } from './modules/add-leaves-type/add-leaves-type.component';
import { AddRoleComponent } from './modules/add-role/add-role.component';
import { HelpComponent } from './modules/help/components/help/help.component';
import { ReportComponent } from './modules/report/components/report/report.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { AppComponent } from "./app.component";

const routes: Routes = [
  {path: '**', redirectTo: 'login'},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'login', component: LoginDataComponent},
  {path: 'main', component: AppComponent},
  {path: 'add-worker', component: AddWorkerComponent, canActivate: [AuthGuard]},
  {path: 'leave-requests', component: LeaveRequestsComponent, canActivate: [AuthGuard]},
  {path: 'leaves', component: LeavesComponent, canActivate: [AuthGuard]},
  {path: 'add-request', component: AddRequestComponent, canActivate: [AuthGuard]},
  {path: 'roles', component: RolesComponent, canActivate: [AuthGuard]},
  {path: 'leaves-types', component: LeavesTypesComponent, canActivate: [AuthGuard]},
  {path: 'add-leave-type', component: AddLeavesTypeComponent, canActivate: [AuthGuard]},
  {path: 'add-role', component: AddRoleComponent, canActivate: [AuthGuard]},
  {path: 'help', component: HelpComponent, canActivate: [AuthGuard]},
  {path: 'report', component: ReportComponent, canActivate: [AuthGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
