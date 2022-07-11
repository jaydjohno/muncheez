import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'store',
        loadChildren: () => import('../store/store.module').then(m => m.StorePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'order/:id',
        loadChildren: () => import('../orderdetails/orderdetails.module').then(m => m.OrderDetailsPageModule)
      },
	  {
        path: 'products',
        loadChildren: () => import('../products/products.module').then(m => m.ProductsPageModule)
      },
	  {
        path: 'product/:id',
        loadChildren: () => import('../productdetails/productdetails.module').then(m => m.ProductDetailsPageModule)
      },
	  {
        path: 'reviews',
        loadChildren: () => import('../reviews/reviews.module').then(m => m.ReviewsPageModule)
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
