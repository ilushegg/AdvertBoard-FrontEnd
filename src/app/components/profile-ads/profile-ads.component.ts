import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
  isVisible = false;

  constructor(private adService: AdService, public loadingService: LoadingService, private nzNotificationService: NzNotificationService, private nzModal: NzModalService) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    this.adService.getAuthorAdsPagedFiltered(0, this.pageSize, this.user.id).subscribe(res => {
      this.ads = res;
      this.loadingService.isLoading$.next(false);
    })
  }

  delete(id: string) {
    console.log("УДАЛЕНИЕ")
    this.adService.deleteAd(id).subscribe( res => {
      this.nzNotificationService.success("Ок", "Объявление успешно удалено");
    }
    );

    
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(id: string): void {
    this.delete(id);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
