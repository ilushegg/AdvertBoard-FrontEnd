import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/ad.model';
import { AdService } from 'src/app/services/ad.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {


  public ads: Advertisement[] = [];
  constructor(private adService: AdService, public loadingService: LoadingService) { }
  pageSize = 10;
  pageNumber = 1;


  ngOnInit(): void {
    this.adService.getPagedFiltered(0, this.pageSize).subscribe(res => {
      this.ads = res;
      console.log(this.ads);
    })
  }

}
