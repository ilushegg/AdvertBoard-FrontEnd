import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AdComponent } from './components/ad/ad.component';
import { MainComponent } from './components/main/main.component';
import { AdCreatingComponent } from './components/ad-creating/ad-creating.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'advertisements',
    component: AdComponent
  },
  {
    path: 'add-new-ad',
    component: AdCreatingComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
