import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private nzMessageService: NzMessageService, public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  isFooter(): boolean {
    if ((this.router.url != '/auth') && (this.router.url.indexOf('/auth/recovering/') == -1) && (this.router.url.indexOf('/auth/activate/') == -1)) {

              return true;
      }

    return false;
  }

  copyEmail(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.nzMessageService.success("Адрес электронной почты скопирован");
  }

}
