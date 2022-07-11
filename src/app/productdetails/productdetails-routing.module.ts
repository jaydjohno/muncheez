import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsPage } from './productdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailsPageRoutingModule {}
