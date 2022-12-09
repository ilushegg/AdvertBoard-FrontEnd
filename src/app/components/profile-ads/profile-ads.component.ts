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

  showDeleteConfirm(id: string): void {
    this.nzModal.confirm({
      nzTitle: 'Вы уверены, что хотите удалить объявление?',
      nzContent: '<b style="color: red;">Это действие нельзя будет отменить</b>',
      nzOkText: 'Да',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(id),
      nzCancelText: 'Нет',
      nzOnCancel: () => console.log('Cancel'),
      nzStyle: { borderRadius: '20px' },
      nzCentered: true,
      nzClosable: false
    });
  }

}
