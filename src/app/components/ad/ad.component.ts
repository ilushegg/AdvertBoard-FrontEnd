import { Component, Input, OnInit } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Advertisement } from 'src/app/models/ad.model';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';


@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  @Input() ad: Advertisement;










  public ads: Advertisement[] = [];

  constructor(private authService: AuthService, private favoriteService: FavoriteService, private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    
  }

  addToFavorite(adId: string){
    this.favoriteService.addToFavorite(adId, this.authService.id!).subscribe(res => {
      this.nzMessageService.success("Объявление добавлено в избранное.")
      this.ad.isFavorite = true;
    });
  }

  deleteFromFavorite(adId: string){
    this.favoriteService.deleteFromFavorite(adId, this.authService.id!).subscribe(res => {
      this.nzMessageService.success("Объявление удалено из избранного.")
      this.ad.isFavorite = false;
    });
  }


}
