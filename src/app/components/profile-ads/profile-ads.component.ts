import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/ad.model';
import { User } from 'src/app/models/user.model';
import { AdService } from 'src/app/services/ad.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-profile-ads',
  templateUrl: './profile-ads.component.html',
  styleUrls: ['./profile-ads.component.scss']
})
export class ProfileAdsComponent implements OnInit {

  @Input()public user: User;
  public ads: Advertisement[] = [];
  private pageSize = 10;
  private pageNumber = 1;

  constructor(private adService: AdService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    this.adService.getAuthorAdsPagedFiltered(0, this.pageSize, this.user.id).subscribe(res => {
      this.ads = res;
      console.log(this.ads);
      this.loadingService.isLoading$.next(false);
    })
  }

}
