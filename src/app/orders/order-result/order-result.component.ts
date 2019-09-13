import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.css']
})
export class OrderResultComponent implements OnInit {
  items = [];
  pageOfItems: Array<any>;
  isCollapsed: boolean = true;
  pageSize = 5;

  private orderSubscription: Subscription;
  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.items = this.orderService.orders;
    if(this.items.length < 1) {
      this.fetchAndRemoveOrdersLocally();
    } 
      
    this.orderSubscription = this.orderService.ordersReceived.subscribe(
      (ordersReceived: any[]) => {
        this.isCollapsed = true;
        this.items = ordersReceived;
        this.removeAndSetOrdersLocally(this.items);
      }
    );
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

  //saving order data in local storage for refresh handle
  removeAndSetOrdersLocally(order: any[]) {
    localStorage.removeItem('Orders');
    localStorage.setItem('Orders', JSON.stringify(order));
  }

  //fetch order data from local storage for in case of refresh page
  fetchAndRemoveOrdersLocally() {
    this.items = JSON.parse(localStorage.getItem('Orders'));
    localStorage.removeItem('Orders'); // to clear it again.
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

}
