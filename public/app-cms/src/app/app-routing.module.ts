import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArticleFormComponent } from './components/articles/article-form/article-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'article', component: ArticleFormComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
