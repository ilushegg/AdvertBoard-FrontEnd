import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/ad.model';


@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  @Input() ad: Advertisement;










  public ads: Advertisement[] = [];
  

  constructor() { }

  ngOnInit(): void {
    
  }


}
