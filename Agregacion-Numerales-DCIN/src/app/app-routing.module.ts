import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FrmloginComponent } from './frmlogin/frmlogin.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        component: LoginComponent,
        path: ':username',
      },    
    ],
  },  
  {
    path: '',
    component: MainComponent,
    children: [
      {
        component: HomeComponent,
        path: '',
      },
      {
        component: FrmloginComponent,
        path: 'frmlogin',
      },
      {
        component: ErrorComponent,
        path: 'error',
      },
      {
        path: 'estructura',
        loadChildren: () => import('./estructura/estructura.module').then(m => m.EstructuraModule)
      },
      {
        path: 'consultas',
        loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
