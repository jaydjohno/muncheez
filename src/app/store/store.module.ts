import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorePage } from './store.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StorePageRoutingModule } from './store-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StorePageRoutingModule
  ],
  declarations: [StorePage]
})
export class StorePageModule {}
