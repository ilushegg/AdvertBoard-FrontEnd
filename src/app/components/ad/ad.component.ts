import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/ad.model';
import { AdService } from 'src/app/services/ad.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-card',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  public ads: Advertisement[] = [];
  

  public pageSize = 10;
  public pageNumber = 1;


  constructor(private cardService: AdService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    this.cardService.getPagedFiltered(0, this.pageSize).subscribe(res => {
      this.ads = res;
      console.log(this.ads);
      this.loadingService.isLoading$.next(false);
    })
  }

  onMouseEnter() {
    console.log("mouse enter");
  }

}
