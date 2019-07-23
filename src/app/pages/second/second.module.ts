import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecondPage } from './second.page';
import { LocationPickerComponent } from 'src/app/shared/pickers/location-picker/location-picker.component';

const routes: Routes = [
  {
    path: '',
    component: SecondPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SecondPage,
    LocationPickerComponent
  ]
})
export class SecondPageModule {}
