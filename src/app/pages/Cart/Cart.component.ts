import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../services/Cart/Cart.service';
import { IItem } from '../../models/IItem';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css'],
  imports: [CommonModule,RouterLink],
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService,private cdr:ChangeDetectorRef,private _Router:Router) {}
  cartItems!: IItem[];
  cartItemsCount: number = 0;

  ngOnInit() {
    this.getCartItem();

    this._CartService.cartCount$.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }

  getCartItem() {
    this._CartService.getCartItem().subscribe({
      next: (res) => {
        this.cartItems = res.items;
        console.log(this.cartItems);
      },
      error: (error) => console.log(error),
    });
  }

  deleteItem(id: number) {
    this._CartService.deleteItem(id).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Item deleted Successfully',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
        this.getCartItem()
      },
      error:(error)=> console.log(error)
    });
  }

  
}
