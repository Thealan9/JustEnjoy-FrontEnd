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
  canActivate: [AuthGuard,RoleGuard],
  data: { roles: ['user'] },
  loadChildren: () =>
    import('./user/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard,RoleGuard],
    data: { roles: ['user','admin'] },
    resolve: {
    user: UserResolver
    },
    loadChildren: () => import('./user/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'detail',
    canActivate: [AuthGuard,RoleGuard],
    data: { roles: ['user'] },
    loadChildren: () => import('./user/detail/detail.module').then( m => m.DetailPageModule)
  },



  //------------------------ Admin------------------------------
  {
  path: 'admin',
  canActivate: [AuthGuard,RoleGuard],
  data: { roles: ['admin'] },
  loadChildren: () =>
    import('./admin/home/home.module').then(m => m.HomePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
