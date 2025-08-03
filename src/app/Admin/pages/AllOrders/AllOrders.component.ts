import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/Order/Order.service';
import { IOrderResponse } from '../../../models/IOrderResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-AllOrders',
  templateUrl: './AllOrders.component.html',
  styleUrls: ['./AllOrders.component.css'],
  imports:[DatePipe]
})
export class AllOrdersComponent implements OnInit,AfterViewInit {

  constructor(private _OrderService:OrderService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
      this.getOrders()
  }


  orders!: IOrderResponse[];
    getOrders() {
      this._OrderService.getAllOrders().subscribe({
        next: (res) => {
          this.orders = res;
          // console.log(this.orders)
        },
        error: (err) => console.log(err),
      });
    }

}
