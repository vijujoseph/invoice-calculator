import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  ordersReceived = new Subject<any[]>();
  ordersSummaryReceived = new Subject<any[]>();

  orders : any[] = [];
  orderSummary : any = {};
  collectionSize : number = 0;

  baseUrl:string = "http://localhost:3000";

  constructor(private httpClient : HttpClient) {
  }

  add_order(order: any) {
    this.orders.push(this.processOrderData(order))
    this.ordersReceived.next(this.orders);
  }

  add_order_summary(totalCharge: number, noOfOrders: number, startDate: Date, endDate: Date){
    this.collectionSize = noOfOrders;
    this.orderSummary = this.getOrderSummary(totalCharge, noOfOrders, this.orderSummary, startDate, endDate);
    this.ordersSummaryReceived.next(this.orderSummary);
  }

  get_orders(url: string){
    return this.httpClient.get(this.baseUrl + url);
  }

  get_order_summary() {
    return this.orderSummary;
  }

  get_collection_size() {
    return this.collectionSize;
  }

  clear_orders(){
    return this.orders=[];
  }

  get_orders_byId(url: string){
    return this.httpClient.get(this.baseUrl + url);
  }

  processOrderData(data:any)  
  {
      let sum:number=0.0;
      let currency:string= '';
      for (let item of data.items)
      {
          sum += parseFloat(item.total_price.amount);
          currency = item.total_price.currency;
      }
      data.items_total = sum;
      data.base_currency = currency;
      return data;
  }

  getOrderSummary(totalCharge: number, noOfOrder: number, orderSummary:any, date1, date2) {
    orderSummary.startDate = date1;
    orderSummary.endDate = date2;
    orderSummary.dateDiff = '';
    orderSummary.noOfOrders = noOfOrder;
    orderSummary.totalCharge = totalCharge;
    if(date1 && date2) {
      orderSummary.dateDiff = this.countDays(date1,date2);
    }
    return orderSummary;
  }

  countDays(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY);
  }
}
