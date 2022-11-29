import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullAdvertisement } from 'src/app/models/full-ad.model';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-full',
  templateUrl: './ad-full.component.html',
  styleUrls: ['./ad-full.component.scss']
})
export class AdFullComponent implements OnInit {


  public ad: FullAdvertisement | undefined;

  constructor(private adService: AdService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.adService.getById(id).subscribe(res => {
      this.ad = res;
      console.log(this.ad);
    })
  }

}
