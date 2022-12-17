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
import { AuthorProfileComponent } from './components/author-profile/author-profile.component';
import { SearchAdsComponent } from './components/search-ads/search-ads.component';
import { AuthGuard } from './auth.guard';
import { UserActivateComponent } from './components/user-activate/user-activate.component';

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
    path: 'auth/activate/:id/:activationCode',
    component: UserActivateComponent
  },
  {
    path: 'advertisements',
    component: AdsComponent
  },
  {
    path: 'add-new-ad',
    component: AdCreatingComponent,
    canActivate: [AuthGuard]
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
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'advertisements/editing/:id',
    component: AdEditingComponent
  },
  {
    path: 'author/:id',
    component: AuthorProfileComponent
  },
  {
    path: 'search',
    component: SearchAdsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
