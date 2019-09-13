import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  orderSummary : any;
  private orderSummarySubscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderSummary = this.orderService.get_order_summary;
    if(this.orderSummary.length < 1) {
      this.fetchAndRemoveOrderSummaryLocally();
    }      

    this.orderSummarySubscription = this.orderService.ordersSummaryReceived.subscribe(
      (ordersSummary: any) => {
        this.orderSummary = ordersSummary;
        this.removeAndSetOrderSummaryLocally(this.orderSummary);
      }
    );
  }

  ngOnDestroy(): void {
    this.orderSummarySubscription.unsubscribe();
  }

  //saving order data in local storage for refresh handle
  removeAndSetOrderSummaryLocally(orderSummary: any[]) {
    localStorage.removeItem('orderSummary');
    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
  }

  //fetch order data from local storage for in case of refresh page
  fetchAndRemoveOrderSummaryLocally() {
    this.orderSummary = JSON.parse(localStorage.getItem('orderSummary'));
    localStorage.removeItem('orderSummary'); // to clear it again.
  }
}
