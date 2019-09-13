import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderEnquiryComponent } from './orders/order-enquiry/order-enquiry.component';
import { OrderResultComponent } from './orders/order-result/order-result.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
