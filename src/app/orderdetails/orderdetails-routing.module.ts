import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsPage } from './orderdetails.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailsPageRoutingModule {}
