import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ad-creating',
  templateUrl: './ad-creating.component.html',
  styleUrls: ['./ad-creating.component.scss']
})
export class AdCreatingComponent implements OnInit {

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    price: [0, [Validators.pattern('^\d+(,\d{1,2})?$')]],
    categoryId: ['', Validators.required],
    Images: [[]]
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
