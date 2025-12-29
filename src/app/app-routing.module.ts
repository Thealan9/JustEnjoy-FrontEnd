import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth-guard';
import { UserResolver } from './core/user.resolver';
import { RoleGuard } from './core/role-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
//----------------------------------User---------------------------------------
  {
  path: 'home',
  canMatch: [AuthGuard,RoleGuard],
  data: { roles: ['user'] },
  loadChildren: () => import('./user/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'detail',
    canMatch: [AuthGuard,RoleGuard],
    data: { roles: ['user'] },
    loadChildren: () => import('./user/detail/detail.module').then( m => m.DetailPageModule)
  },



  //------------------------ Admin------------------------------
  {
  path: 'admin',
  canMatch: [AuthGuard,RoleGuard],
  data: { roles: ['admin'] },
  loadChildren: () => import('./admin/home/home.module').then(m => m.HomePageModule)
  },

  //users
  {
    path: 'admin/users',
    canMatch: [AuthGuard,RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./admin/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'admin/users/edit/:id',
    canMatch: [AuthGuard,RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./admin/users/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'admin/users/create',
    canMatch: [AuthGuard,RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./admin/users/create/create.module').then( m => m.CreatePageModule)
  },
  // {
  //   path: 'listings',
  //   canMatch: [AuthGuard,RoleGuard],
  //   data: { roles: ['admin'] },
  //   loadChildren: () => import('./admin/listings/listings.module').then( m => m.ListingsPageModule)
  // },
  // {
  //   path: 'reports',
  //   canMatch: [AuthGuard,RoleGuard],
  //   data: { roles: ['admin'] },
  //   loadChildren: () => import('./admin/reports/reports.module').then( m => m.ReportsPageModule)
  // },



  //locales
  {
    path: 'admin/locales',
    canMatch: [AuthGuard,RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./admin/locals/locals.module').then( m => m.LocalsPageModule)
  },
  {
    path: 'admin/locales/edit/:id',
    canMatch: [AuthGuard,RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./admin/locals/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'admin/locales/create',
    canMatch: [AuthGuard,RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./admin/locals/create/create.module').then( m => m.CreatePageModule)
  },






  //---------------------Compartidas------------------------------------------
  {
    path: 'profile',
    canMatch: [AuthGuard,RoleGuard],
    data: { roles: ['user','admin'] },
    resolve: {
    user: UserResolver
    },
    loadChildren: () => import('./user/profile/profile.module').then( m => m.ProfilePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
