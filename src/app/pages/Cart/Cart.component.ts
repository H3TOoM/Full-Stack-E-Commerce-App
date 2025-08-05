import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../services/Cart/Cart.service';
import { IItem } from '../../models/IItem';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { IAddress } from '../../models/IAddress';
import { AddressService } from '../../services/Address/Address.service';
import { OrderService } from '../../services/Order/Order.service';
import { IOrderRequest } from '../../models/IOrderRequest';
import { ICart } from '../../models/ICart';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css'],
  imports: [CommonModule, RouterLink],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Router: Router,
    private _AddressService: AddressService,
    private _OrderService: OrderService
  ) {}
  cart!: ICart;
  cartItems!: IItem[];
  cartItemsCount: number = 0;

  ngOnInit() {
    this.getCart();
    this.getCartItem();

    this._CartService.cartCount$.subscribe((count) => {
      this.cartItemsCount = count;
    });

    this.getAddress();
  }

  getCart() {
    this._CartService.getCart().subscribe({
      next: (res: ICart) => {
        this.cart = res;
      },
      error: (err) => console.log(err),
    });
  }

  getCartItem() {
    this._CartService.getCartItem().subscribe({
      next: (res) => {
        this.cartItems = res.items;
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
        this.getCartItem();
      },
      error: (error) => console.log(error),
    });
  }

  clearCart() {
    if (this.cartItems.length == 0) {
      Swal.fire({
        title: 'No Items In This Cart!',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
      });

      return;
    }

    this._CartService.clearCart().subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Cart Cleared Successfully',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });

        // Update UI
        this.getCartItem();

        this._CartService.setCartCount(0);
      },
      error: (err) => console.log(err),
    });
  }

  getTotalPrice(): number {
    return (this.cartItems ?? [])
      .map((item) => item.product.price * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  getTax(): number {
    const total = this.getTotalPrice();
    const extra = total * 0.02;
    return extra;
  }

  getTotalAmount() {
    const price = this.getTotalPrice();
    const tax = this.getTax();

    return price + tax;
  }

  addresses: IAddress[] = [];
  address!: IAddress;
  getAddress() {
    this._AddressService.getAddress().subscribe({
      next: (res) => {
        this.addresses = res;
        this.address = this.addresses[0];
      },
      error: (err) => console.log(err),
    });
  }

  placeOrder(cart: ICart) {
    // get order items detailts to post in API
    const orderItems = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    // defination order
    const order: IOrderRequest = {
      orderDate: new Date().toISOString(),
      status: 'Pending',
      orderItems: orderItems,
      totalAmount: this.getTotalAmount(),
    };

    if (order.orderItems.length === 0) {
      Swal.fire({
        title: 'Please Add Product To Cart!',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
      });

      return;
    }

    // Subscribe to service
    this._OrderService.createOrder(order).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Order Created Successfully!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
        this.clearCart();
        this._Router.navigate(['/my-orders']);
      },
      error: (err) => console.log(err),
    });
  }

  goToOrders() {
    if (this.cartItems.length === 0) {
      Swal.fire({
        title: 'Please Add Item To Cart!',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
      });

      return;
    }

    if (this.addresses.length === 0) {
      Swal.fire({
        title: 'Please Add Address!',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
      });

      return;
    }

    // call placeOrder method
    this.placeOrder(this.cart);

  }
}
