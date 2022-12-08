import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadataConfig, DadataType } from '@kolkov/ngx-dadata';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CategoryService } from 'src/app/services/category.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: User;
  public categories$ = this.categoryService.getAll();

  visible = false;

  constructor(public authService: AuthService, private categoryService: CategoryService, public router: Router) {
  }
  ngOnInit(): void {
    this.authService.user$.subscribe(res => {
      this.user$ = res;
    
    }
    )
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  isHeaderNav(): boolean {
    if ((this.router.url != '/auth')) {

              return true;
      }

    return false;
  }

  isHeaderSearch(): boolean {
    if ((this.router.url != '/auth') && (this.router.url.indexOf('/profile/') == -1) && (this.router.url != '/add-new-ad') && (this.router.url != '/my_advertisements')) {

              return true;
      }

    return false;
  }

}
