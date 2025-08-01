import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../services/Cart/Cart.service';
import { IItem } from '../../models/IItem';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { IAddress } from '../../models/IAddress';
import { AddressService } from '../../services/Address/Address.service';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css'],
  imports: [CommonModule, RouterLink],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private cdr: ChangeDetectorRef,
    private _Router: Router,
    private _AddressService:AddressService
  ) {}
  cartItems!: IItem[];
  cartItemsCount: number = 0;

  ngOnInit() {
    this.getCartItem();

    this._CartService.cartCount$.subscribe((count) => {
      this.cartItemsCount = count;
    });


    this.getAddress()
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
        this.getCartItem();
      },
      error: (error) => console.log(error),
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
    return extra
  }

  getTotalAmount(){
    const price = this.getTotalPrice()
    const tax = this.getTax()

    return price + tax
  }

  

  addresses: IAddress[] = [];
  address!:IAddress
    getAddress() {
      this._AddressService.getAddress().subscribe({
        next: (res) => {
          this.addresses = res;
          this.address = this.addresses[0]
          console.log(this.address);
        },
        error: (err) => console.log(err),
      });
    }

    

}
