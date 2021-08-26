import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDataComponent } from './modules/login/components/login-page/login-data.component';
import { MainPageComponent } from "./modules/main-page/components/main-page/main-page.component";
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

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'login', component: LoginDataComponent},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'add-worker', component: AddWorkerComponent,},
  {path: 'leave-requests', component: LeaveRequestsComponent,},
  {path: 'leaves', component: LeavesComponent,},
  {path: 'add-request',component:AddRequestComponent},
  {path: 'roles',component:RolesComponent},
  {path: 'leaves-types',component:LeavesTypesComponent},
  {path: 'add-leave-type', component:AddLeavesTypeComponent},
  {path: 'add-role',component:AddRoleComponent},
  {path: 'help',component:HelpComponent},
  {path: 'report',component:ReportComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
