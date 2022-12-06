import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserEdit } from 'src/app/models/user-edit.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user$: User;

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    mobile: ['', [Validators.required]]
  })


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(res => {
      this.user$ = res;
      this.form.patchValue({
        name: res.name,
        mobile: res.mobile
      })
    })

  }

  onEditSubmit() {
    var user: UserEdit = {
      id: this.user$.id,
      name: this.form.controls.name.value,
      mobile: this.form.controls.mobile.value,
    };
    user.id = this.user$.id;
    this.userService.edit(user).subscribe();
  }

}
