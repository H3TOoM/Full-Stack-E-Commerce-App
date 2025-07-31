import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/Cart/Cart.service';
import { IItem } from '../../models/IItem';
import { error } from 'console';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  cartItems!: IItem[];
  ngOnInit() {
    this.getCartItem();
  }

  getCartItem() {
    this._CartService.getCartItem().subscribe({
      next: (res) => {
         this.cartItems = res.items;
        console.log(this.cartItems)
      },
      error: (error) => console.log(error),
    });
  }
}
