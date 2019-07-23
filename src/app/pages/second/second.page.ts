import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      location: new FormControl(null, {validators: [Validators.required]})
    });
  }

  onLocationPicked(location: Place) {
    this.form.patchValue({location: location});
  }

}
