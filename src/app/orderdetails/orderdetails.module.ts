import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetailsPage } from './orderdetails.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { OrderDetailsPageRoutingModule } from './orderdetails-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: OrderDetailsPage }]),
    OrderDetailsPageRoutingModule,
  ],
  declarations: [OrderDetailsPage]
})
export class OrderDetailsPageModule {}
