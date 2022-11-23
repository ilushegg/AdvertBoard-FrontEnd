import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { AdService } from 'src/app/services/ad.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-card',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  public cards: Card[] = [];
  

  public pageSize = 10;
  public pageNumber = 1;


  constructor(private cardService: AdService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.cardService.getPagedFiltered(0, this.pageSize).subscribe(res => {
      this.cards = res;
      console.log(this.cards);
      this.loadingService.isLoading.next(false);
    })
  }

}
