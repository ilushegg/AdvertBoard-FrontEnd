import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public categories$ = this.categoryService.getAll();

  constructor(public authService: AuthService, private categoryService: CategoryService) {
  }
  ngOnInit(): void {
  }

}
