import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MainComponent } from './components/main/main.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ErrorInterceptor } from './services/error.interceptor';
import { AdComponent } from './components/ad/ad.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AdCreatingComponent } from './components/ad-creating/ad-creating.component';
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import { AuthInterceptor } from './services/auth.interceptor';
import { AdFullComponent } from './components/ad-full/ad-full.component';
import { NzImageModule } from "ng-zorro-antd/image";
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileAdsComponent } from './components/profile-ads/profile-ads.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProfileDataComponent } from './components/profile-data/profile-data.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AdsComponent } from './components/ads/ads.component';
import { AdEditingComponent } from './components/ad-editing/ad-editing.component';
import { ProfileFavoritesComponent } from './components/profile-favorites/profile-favorites.component';
import { AuthorProfileComponent } from './components/author-profile/author-profile.component';
import { SearchAdsComponent } from './components/search-ads/search-ads.component';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { ProfileCommentsComponent } from './components/profile-comments/profile-comments.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { UserActivateComponent } from './components/user-activate/user-activate.component';
import { UserRecoverPasswordComponent } from './components/user-recover-password/user-recover-password.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ProfileFavoritesNotAuthedComponent } from './components/profile-favorites-not-authed/profile-favorites-not-authed.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    MainComponent,
    AdComponent,
    SpinnerComponent,
    AdCreatingComponent,
    AdFullComponent,
    ProfileComponent,
    ProfileAdsComponent,
    ProfileDataComponent,
    AdsComponent,
    AdEditingComponent,
    ProfileFavoritesComponent,
    AuthorProfileComponent,
    SearchAdsComponent,
    ProfileCommentsComponent,
    UserActivateComponent,
    UserRecoverPasswordComponent,
    AdminPanelComponent,
    FooterComponent,
    ProfileFavoritesNotAuthedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzFormModule,
    NzNotificationModule,
    NzCardModule,
    NzSpinModule,
    NzPaginationModule,
    NzMenuModule,
    NzDropDownModule,
    NzTreeSelectModule,
    NzUploadModule,
    NzInputNumberModule,
    NzMessageModule,
    NzImageModule,
    NzCarouselModule,
    NgImageSliderModule,
    NzAvatarModule,
    NzIconModule,
    NzSelectModule,
    NzTreeViewModule,
    NzTreeModule,
    NzDrawerModule,
    NgxDadataModule,
    AngularYandexMapsModule,
    NzTabsModule,
    NzToolTipModule,
    NzModalModule,
    NzCommentModule,
    NzRadioModule,
    NzSwitchModule,
    NzSkeletonModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: ru_RU }, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
