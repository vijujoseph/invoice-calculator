import { OrderService } from './../../shared/order.service';
import { CustomerService } from './../../shared/customer.service';
import { Customer } from './../../shared/customer.model';
import { Component, OnInit, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-order-enquiry',
  templateUrl: './order-enquiry.component.html',
  styleUrls: ['./order-enquiry.component.css']
})
export class OrderEnquiryComponent implements OnInit {

  endDate: any = '';
  startDate: any = '';
  custSelect: any;
  defaultCustomer: any;
  private customers: Customer[] = [
    new Customer('Select Customer','Select Customer', '')
  ];

  constructor(private customerService: CustomerService
          ,private orderService: OrderService
          ,private datepipe: DatePipe) {
  }
  
  ngOnInit() {
    this.defaultCustomer = this.customers[0];
    this.custSelect = this.defaultCustomer.id;

    this.customerService.get_customers().subscribe((res : Customer[])=>{
      for (var customer of res) {
        this.customers.push(new Customer(customer.id, customer.name, customer.email));
      }
    });
  }
  
  onSearch() {
    let result: any;
    this.orderService.clear_orders();
    if(this.custSelect === 'Select Customer' || this.custSelect === '') {
      var url = this.formUrl("");
      this.orderService.get_orders(url).subscribe((res : any[])=>{
        this.orderService.add_order_summary(this.getTotalChargeCustomer(res),res.length, this.startDate, this.endDate);
        if(res.length>0) {
          for (var order of res) {
            this.orderService.add_order(order);
          }
        } else {
          this.orderService.ordersReceived.next([]);
        }
     });
    }  else {
      var url = this.formUrl(this.custSelect);
      this.orderService.get_orders_byId(url).subscribe((res : any)=>{
        this.orderService.add_order_summary(res.charge_customer.total_price, 1, this.startDate, this.endDate);
        this.orderService.add_order(res);
      });
    }
  }

  formUrl(custId: String) : string {
      var url = "/orders";
      if(custId) {
        url = url + "/" + custId
      }
      if(this.startDate && this.endDate) {
        url = url+ '?created_at_gte=' + this.datepipe.transform(this.startDate, 'yyyy-MM-ddTHH:mm:ss.SSSXXX') 
        + '&created_at_lte=' + this.datepipe.transform(this.endDate, 'yyyy-MM-ddTHH:mm:ss.SSSXXX');
      } else if(this.startDate) {
        url = url+ '?created_at_gte=' + this.datepipe.transform(this.startDate, 'yyyy-MM-ddTHH:mm:ss.SSSXXX');
      } else if(this.endDate) {
        url = url+ '?created_at_lte=' + this.datepipe.transform(this.endDate, 'yyyy-MM-ddTHH:mm:ss.SSSXXX');
      }
      return url;
  }

  onReset() {
    this.endDate  = '';
    this.startDate = '';
    this.custSelect = this.defaultCustomer.id;
  }

  getTotalChargeCustomer(result: any) {
    let sum = 0.0;
    for (let order of result)
    {
        sum += parseFloat(order.charge_customer.total_price);
    }
    return Math.round(sum);
  }

}
