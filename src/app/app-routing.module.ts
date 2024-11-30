import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
const RedireccionarLogin = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {
    path: 'home',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    //Lo tengo que ver
    pathMatch: 'full'
    
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio', 
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},       
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'viaje/:destino',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./pages/viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'vehiculo',
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:RedireccionarLogin},
    loadChildren: () => import('./pages/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },
 



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
