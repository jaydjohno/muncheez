import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetailsPage } from './productdetails.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProductDetailsPageRoutingModule } from './productdetails-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ProductDetailsPage }]),
    ProductDetailsPageRoutingModule,
  ],
  declarations: [ProductDetailsPage]
})
export class ProductDetailsPageModule {}
