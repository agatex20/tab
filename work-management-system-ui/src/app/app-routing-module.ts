import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/components/login-page/login.component';
import { AddWorkerComponent } from './modules/add-worker/components/add-worker/add-worker.component';
import { LoggedGuard } from './authentication/logged.guard';
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
import { AppComponent } from './app.component';
import { PageNotFound } from './utils/components/PageNotFound/page-not-found.component';
import { ManagerGuard } from './authentication/manager.guard';
import { NotLoggedGuard } from './authentication/not-logged.guard';
import { UnAuthorizedComponent } from './utils/components/un-authorized/un-authorized.component';
import { AdminGuard } from './authentication/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedGuard] },
  {
    path: 'add-worker',
    component: AddWorkerComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'leave-requests',
    component: LeaveRequestsComponent,
    canActivate: [ManagerGuard],
  },
  { path: 'leaves', component: LeavesComponent, canActivate: [LoggedGuard] },
  {
    path: 'add-request',
    component: AddRequestComponent,
    canActivate: [LoggedGuard],
  },

  {
    path: 'leaves-types',
    component: LeavesTypesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'add-leave-type',
    component: AddLeavesTypeComponent,
    canActivate: [AdminGuard],
  },
  { path: 'roles', component: RolesComponent, canActivate: [AdminGuard] },
  {
    path: 'add-role',
    component: AddRoleComponent,
    canActivate: [AdminGuard],
  },
  { path: 'help', component: HelpComponent, canActivate: [LoggedGuard] },
  { path: 'report', component: ReportComponent, canActivate: [LoggedGuard] },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [LoggedGuard],
  },
  { path: 'un-authorized', component: UnAuthorizedComponent },
  { path: '**', component: PageNotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
