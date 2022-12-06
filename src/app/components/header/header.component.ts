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
    if ((this.router.url != '/auth') && (this.router.url != `/profile/${this.user$.id}`) && (this.router.url != '/add-new-ad')) {
              return true;
      }
    return false;
  }

}
