import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AdComponent } from './components/ad/ad.component';
import { MainComponent } from './components/main/main.component';
import { AdCreatingComponent } from './components/ad-creating/ad-creating.component';
import { AdFullComponent } from './components/ad-full/ad-full.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileAdsComponent } from './components/profile-ads/profile-ads.component';
import { ProfileDataComponent } from './components/profile-data/profile-data.component';
import { AdsComponent } from './components/ads/ads.component';
import { AdEditingComponent } from './components/ad-editing/ad-editing.component';

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
    component: AdsComponent
  },
  {
    path: 'add-new-ad',
    component: AdCreatingComponent
  },
  {
    path: 'advertisements/:id',
    component: AdFullComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'advertisements/editing/:id',
    component: AdEditingComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
