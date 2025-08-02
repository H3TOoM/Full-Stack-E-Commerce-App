import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/Order/Order.service';
import { IOrderResponse } from '../../models/IOrderResponse';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { IOrderItem } from '../../models/IOrderItem';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-MyOrders',
  templateUrl: './MyOrders.component.html',
  styleUrls: ['./MyOrders.component.css'],
  imports: [CommonModule],
})
export class MyOrdersComponent implements OnInit, AfterViewInit {
  constructor(private _OrderService: OrderService, private _Router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getOrders();

  }

  orders!: IOrderResponse[];
  getOrders() {
    this._OrderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (err) => console.log(err),
    });
  }


 
}
