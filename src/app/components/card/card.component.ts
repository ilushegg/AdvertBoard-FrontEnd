import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cards: Card[] = [];
  

  public pageSize = 1;
  public pageNumber = 1;


  constructor(private cardService: CardService, public loadingService: LoadingService) { }

  ngOnInit(): void {

  }

}
