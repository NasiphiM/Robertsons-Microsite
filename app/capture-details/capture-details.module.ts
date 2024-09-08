import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaptureDetailsPageRoutingModule } from './capture-details-routing.module';

import { CaptureDetailsPage } from './capture-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaptureDetailsPageRoutingModule
  ],
  declarations: [CaptureDetailsPage]
})
export class CaptureDetailsPageModule {}
