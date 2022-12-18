import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['./user-activate.component.scss']
})
export class UserActivateComponent implements OnInit {

  constructor(private authService: AuthService, private router: ActivatedRoute) { }

  message: string = '';

  ngOnInit(): void {
    const code = this.router.snapshot.params['activationCode'];
    const id = this.router.snapshot.params['id'];
    this.authService.activate(id, code).subscribe(res => {
      this.message = res.value;
    });
  }

}
