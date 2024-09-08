import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptureDetailsPage } from './capture-details.page';

const routes: Routes = [
  {
    path: '',
    component: CaptureDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaptureDetailsPageRoutingModule {}
